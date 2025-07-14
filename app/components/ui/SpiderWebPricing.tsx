'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NodeConfig {
  id: string;
  label: string;
  description: string;
  sector: string;
  position: { x: number; y: number };
  children?: { [key: string]: NodeConfig };
}

interface PricingNode {
  id: string;
  label: string;
  description: string;
  position: { x: number; y: number };
  parentId?: string;
  unlocked: boolean;
  selected: boolean;
  sector: string;
  level: number;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

// JSON configuration - In a real app, this would be imported from a separate file
const DEFAULT_CONFIG: { [key: string]: NodeConfig } = {
  "center": {
    "id": "center",
    "label": "Start Here",
    "description": "Choose your development path to unlock features",
    "sector": "center",
    "position": { "x": 700, "y": 400 },
    "children": {
      "web": {
        "id": "web",
        "label": "Web Development",
        "description": "Modern, responsive web applications and websites",
        "sector": "web",
        "position": { "x": 950, "y": 200 },
        "children": {
          "web-frontend": {
            "id": "web-frontend",
            "label": "Frontend Development",
            "description": "User interface and client-side development",
            "sector": "web",
            "position": { "x": 1150, "y": 120 },
            "children": {
              "web-react": {
                "id": "web-react",
                "label": "React Application",
                "description": "Modern React.js single-page application",
                "sector": "web",
                "position": { "x": 1300, "y": 80 }
              },
              "web-vue": {
                "id": "web-vue",
                "label": "Vue.js Application",
                "description": "Progressive Vue.js web application",
                "sector": "web",
                "position": { "x": 1300, "y": 160 }
              }
            }
          },
          "web-backend": {
            "id": "web-backend",
            "label": "Backend Development",
            "description": "Server-side logic and API development",
            "sector": "web",
            "position": { "x": 1150, "y": 280 },
            "children": {
              "web-nodejs": {
                "id": "web-nodejs",
                "label": "Node.js API",
                "description": "Fast and scalable Node.js backend",
                "sector": "web",
                "position": { "x": 1300, "y": 320 }
              }
            }
          }
        }
      },
      "mobile": {
        "id": "mobile",
        "label": "Mobile Development",
        "description": "Native and cross-platform mobile applications",
        "sector": "mobile",
        "position": { "x": 950, "y": 600 },
        "children": {
          "mobile-native": {
            "id": "mobile-native",
            "label": "Native Development",
            "description": "Platform-specific native applications",
            "sector": "mobile",
            "position": { "x": 1150, "y": 520 },
            "children": {
              "mobile-ios": {
                "id": "mobile-ios",
                "label": "iOS App",
                "description": "Native iOS application with Swift",
                "sector": "mobile",
                "position": { "x": 1300, "y": 480 }
              },
              "mobile-android": {
                "id": "mobile-android",
                "label": "Android App", 
                "description": "Native Android application with Kotlin",
                "sector": "mobile",
                "position": { "x": 1300, "y": 560 }
              }
            }
          }
        }
      }
    }
  }
};

interface SpiderWebPricingProps {
  configUrl?: string; // Optional URL to fetch config from
  config?: { [key: string]: NodeConfig }; // Optional direct config
}

const SpiderWebPricing: React.FC<SpiderWebPricingProps> = ({ 
  configUrl, 
  config 
}) => {
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set(['center']));
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [nodeConfig, setNodeConfig] = useState<{ [key: string]: NodeConfig }>(config || DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(!!configUrl);
  
  // Pan and zoom state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Load configuration from URL
  useEffect(() => {
    if (configUrl) {
      fetch(configUrl)
        .then(response => response.json())
        .then(data => {
          setNodeConfig(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Failed to load node configuration:', error);
          setNodeConfig(DEFAULT_CONFIG);
          setIsLoading(false);
        });
    }
  }, [configUrl]);

  // Recursive function to flatten the nested configuration into a flat array
  const flattenConfig = useCallback((
    config: { [key: string]: NodeConfig }, 
    parentId?: string, 
    level: number = 0
  ): PricingNode[] => {
    const nodes: PricingNode[] = [];
    
    Object.values(config).forEach(nodeConfig => {
      // Add the current node
      nodes.push({
        id: nodeConfig.id,
        label: nodeConfig.label,
        description: nodeConfig.description,
        position: nodeConfig.position,
        parentId,
        unlocked: nodeConfig.id === 'center',
        selected: false,
        sector: nodeConfig.sector,
        level
      });

      // Recursively add children
      if (nodeConfig.children) {
        const childNodes = flattenConfig(nodeConfig.children, nodeConfig.id, level + 1);
        nodes.push(...childNodes);
      }
    });

    return nodes;
  }, []);

  // Generate connections from the flattened nodes
  const generateConnections = useCallback((nodes: PricingNode[]): Connection[] => {
    const connections: Connection[] = [];
    
    nodes.forEach(node => {
      if (node.parentId) {
        connections.push({
          from: node.parentId,
          to: node.id,
          active: false
        });
      }
    });

    return connections;
  }, []);

  // Process the configuration into nodes and connections
  const { nodes, connections } = useMemo(() => {
    const flatNodes = flattenConfig(nodeConfig);
    const nodeConnections = generateConnections(flatNodes);
    
    return {
      nodes: flatNodes,
      connections: nodeConnections
    };
  }, [nodeConfig, flattenConfig, generateConnections]);

  // Mouse tracking for hover tooltips - Optimized version
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Always track mouse position for tooltips
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    // Handle panning only when dragging
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  }, [isDragging, dragStart]);

  // Pan and zoom handlers - Optimized
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - transform.x,
        y: e.clientY - transform.y
      });
    }
  }, [transform]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.3, Math.min(3, transform.scale * delta));
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const scaleChange = newScale / transform.scale;
      setTransform(prev => ({
        x: mouseX - (mouseX - prev.x) * scaleChange,
        y: mouseY - (mouseY - prev.y) * scaleChange,
        scale: newScale
      }));
    }
  }, [transform]);

  // Reset view function
  const resetView = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  // Handle node selection with recursive unlocking - Fixed version
  const handleNodeClick = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !unlockedNodes.has(nodeId)) return;

    const newSelectedNodes = new Set(selectedNodes);
    const newUnlockedNodes = new Set(unlockedNodes);
    const newActiveConnections = new Set(activeConnections);

    if (selectedNodes.has(nodeId)) {
      // Deselect node and recursively deselect/lock children
      const deselect = (id: string) => {
        newSelectedNodes.delete(id);
        const children = nodes.filter(n => n.parentId === id);
        children.forEach(child => {
          newUnlockedNodes.delete(child.id);
          newActiveConnections.delete(`${id}-${child.id}`);
          deselect(child.id); // Recursive deselection
        });
      };
      deselect(nodeId);
    } else {
      // Select node and unlock direct children
      newSelectedNodes.add(nodeId);
      
      // Add connection from parent to this node
      if (node.parentId) {
        newActiveConnections.add(`${node.parentId}-${nodeId}`);
      }

      // Unlock direct children only
      const directChildren = nodes.filter(n => n.parentId === nodeId);
      directChildren.forEach(child => {
        newUnlockedNodes.add(child.id);
        newActiveConnections.add(`${nodeId}-${child.id}`);
      });
    }

    setSelectedNodes(newSelectedNodes);
    setUnlockedNodes(newUnlockedNodes);
    setActiveConnections(newActiveConnections);
  }, [nodes, selectedNodes, unlockedNodes, activeConnections]);

  // Handle node hover - Optimized with throttling
  const handleNodeHover = useCallback((nodeId: string | null) => {
    if (hoveredNode !== nodeId) {
      setHoveredNode(nodeId);
    }
  }, [hoveredNode]);

  // Get connection path - Memoized for better performance
  const getConnectionPath = useCallback((from: PricingNode, to: PricingNode) => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Create smooth curved paths with better control points
    const controlOffset = Math.min(distance * 0.4, 150);
    const midX = from.position.x + dx * 0.5;
    const midY = from.position.y + dy * 0.5;
    
    // Add perpendicular offset for more natural curves
    const perpX = -dy / distance * controlOffset * 0.3;
    const perpY = dx / distance * controlOffset * 0.3;
    
    return `M ${from.position.x} ${from.position.y} Q ${midX + perpX} ${midY + perpY} ${to.position.x} ${to.position.y}`;
  }, []);

  // Calculate tooltip position to avoid overlaps
  const getTooltipPosition = useCallback(() => {
    const tooltipWidth = 250;
    const tooltipHeight = 80;
    const padding = 20;
    
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: mousePosition.x, y: mousePosition.y };
    
    let x = mousePosition.x + padding;
    let y = mousePosition.y - tooltipHeight / 2;
    
    // Adjust if tooltip would go off-screen
    if (x + tooltipWidth > containerRect.width) {
      x = mousePosition.x - tooltipWidth - padding;
    }
    
    if (y < padding) {
      y = padding;
    } else if (y + tooltipHeight > containerRect.height - padding) {
      y = containerRect.height - tooltipHeight - padding;
    }
    
    return { x, y };
  }, [mousePosition]);

  const hoveredNodeData = hoveredNode ? nodes.find(n => n.id === hoveredNode) : null;
  const tooltipPosition = getTooltipPosition();

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto glass p-8 rounded-3xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading configuration...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto glass p-8 rounded-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Interactive Project Builder</h3>
        <p className="text-muted-foreground">Explore and select features to build your custom solution</p>
        <motion.div 
          className="mt-4 p-4 rounded-2xl bg-accent/10 border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm text-muted-foreground">Selected Features</div>
          <div className="text-xl font-bold gradient-text">
            {selectedNodes.size > 0 ? `${selectedNodes.size} features selected` : 'Start by clicking the center node'}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <motion.button
            className="btn-secondary text-sm px-3 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetView}
          >
            Reset View
          </motion.button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Zoom: {Math.round(transform.scale * 100)}% | Nodes: {nodes.length}
        </div>
      </div>

      {/* Interactive Canvas */}
      <div 
        ref={containerRef}
        className="relative w-full h-[700px] overflow-hidden rounded-2xl bg-gradient-to-br from-background/50 to-muted/30 border border-border"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
      >
        {/* SVG for connections and nodes - Performance Optimized */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1600 900"
          className="absolute inset-0"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            willChange: 'transform'
          }}
        >
          {/* Render connections with flowing animations */}
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            
            if (!fromNode || !toNode) return null;

            const isFromUnlocked = unlockedNodes.has(connection.from);
            const isToUnlocked = unlockedNodes.has(connection.to);
            const isActive = activeConnections.has(`${connection.from}-${connection.to}`) ||
                           (selectedNodes.has(connection.from) && isToUnlocked) ||
                           (isFromUnlocked && isToUnlocked);

            const shouldShow = isFromUnlocked && isToUnlocked;

            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={getConnectionPath(fromNode, toNode)}
                stroke={isActive ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.2)'}
                strokeWidth={isActive ? 2.5 : 1}
                fill="none"
                strokeLinecap="round"
                initial={{ 
                  pathLength: 0, 
                  opacity: 0,
                  strokeDasharray: "0 1"
                }}
                animate={{ 
                  pathLength: shouldShow ? 1 : 0,
                  opacity: shouldShow ? (isActive ? 1 : 0.5) : 0,
                  strokeDasharray: isActive ? "1 0" : "0 1"
                }}
                transition={{ 
                  pathLength: {
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 0.4,
                    delay: index * 0.04
                  },
                  strokeDasharray: {
                    duration: 0.6,
                    delay: index * 0.06
                  }
                }}
                style={{
                  filter: isActive ? 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.4))' : 'none'
                }}
              />
            );
          })}

          {/* Render nodes with smooth entrance animations */}
          {nodes.map((node, index) => {
            const isUnlocked = unlockedNodes.has(node.id);
            const isSelected = selectedNodes.has(node.id);
            const isCenter = node.id === 'center';
            const isHovered = hoveredNode === node.id;

            if (!isUnlocked) return null;

            const nodeRadius = isCenter ? 25 : Math.max(15, 18 + (node.level * 1.5));

            return (
              <motion.g
                key={node.id}
                initial={{ 
                  scale: 0, 
                  opacity: 0,
                  y: 20
                }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.3 }
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.06,
                  duration: 0.6
                }}
                className="cursor-pointer"
                style={{ pointerEvents: 'all' }}
              >
                {/* Node glow effect for selected/hovered */}
                {(isSelected || isHovered) && (
                  <motion.circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={nodeRadius + 8}
                    fill="none"
                    stroke="rgb(99, 102, 241)"
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={isSelected ? 0.6 : 0.3}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [0.8, 1.2, 1],
                      opacity: [0, isSelected ? 0.6 : 0.3, isSelected ? 0.4 : 0.2]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    style={{ pointerEvents: 'none' }}
                  />
                )}

                {/* Main node circle */}
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={nodeRadius}
                  initial={{
                    fill: isCenter ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  animate={{
                    fill: isCenter 
                      ? 'rgb(99, 102, 241)'
                      : isSelected 
                        ? 'rgb(99, 102, 241)' 
                        : isHovered
                          ? 'rgba(99, 102, 241, 0.7)'
                          : `rgba(255, 255, 255, ${Math.max(0.15, 0.3 - (node.level * 0.05))})`,
                    scale: isHovered ? 1.1 : 1
                  }}
                  stroke={isSelected ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.4)'}
                  strokeWidth={isSelected ? 3 : 1.5}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node.id);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    handleNodeHover(node.id);
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    handleNodeHover(null);
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3
                  }}
                  style={{ 
                    cursor: 'pointer',
                    filter: isSelected ? 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' : 'none'
                  }}
                />

                {/* Level indicator rings with breathing animation */}
                {node.level > 1 && (
                  <motion.circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={nodeRadius + 6}
                    fill="none"
                    stroke={`rgba(99, 102, 241, ${Math.max(0.1, 0.4 - (node.level * 0.1))})`}
                    strokeWidth={1}
                    strokeDasharray="4,4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.95, 1.05, 0.95],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    style={{ pointerEvents: 'none' }}
                  />
                )}

                {/* Unlock ripple animation */}
                <AnimatePresence>
                  {!isCenter && (
                    <motion.circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r={nodeRadius}
                      fill="none"
                      stroke="rgb(99, 102, 241)"
                      strokeWidth={3}
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ 
                        scale: [1, 2.5, 3],
                        opacity: [0.8, 0.4, 0]
                      }}
                      transition={{ 
                        duration: 1.2,
                        ease: "easeOut",
                        delay: index * 0.1
                      }}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </AnimatePresence>

                {/* Node label with smooth transitions */}
                <motion.text
                  x={node.position.x}
                  y={node.position.y + 3}
                  textAnchor="middle"
                  className={`font-medium pointer-events-none select-none ${
                    isSelected ? 'fill-white' : 'fill-white/90'
                  }`}
                  style={{ 
                    fontSize: `${Math.max(8, 11 - node.level * 0.5)}px`,
                    fontWeight: isSelected ? 'bold' : 'normal'
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ 
                    delay: index * 0.08 + 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  {node.label.length > (20 - node.level * 2) ? 
                    node.label.substring(0, 20 - node.level * 2) + '...' : 
                    node.label}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>

        {/* Hover Tooltip - Performance optimized */}
        <AnimatePresence mode="wait">
          {hoveredNodeData && hoveredNode && !isDragging && (
            <motion.div
              className="absolute z-50 pointer-events-none"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                willChange: 'transform, opacity'
              }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 0.2
              }}
            >
              <div className="glass-subtle p-4 rounded-2xl shadow-lg border border-accent/20 max-w-60 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-accent">
                    {hoveredNodeData.label}
                  </h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent font-mono">
                    L{hoveredNodeData.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hoveredNodeData.description}
                </p>
                <div className="mt-2 text-xs text-accent/80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent/60"></span>
                  Click to {selectedNodes.has(hoveredNodeData.id) ? 'deselect' : 'select'}
                  {hoveredNodeData.level === 0 && ' • Unlocks children'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          className="absolute top-4 right-4 glass-subtle p-4 rounded-2xl text-sm z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="space-y-2">
            <div className="text-accent font-medium mb-3">Legend</div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/10"></div>
              <span>Locked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-accent/50 border-dashed"></div>
              <span>Deep Level</span>
            </div>
            <div className="border-t border-border pt-2 mt-3">
              <div className="text-xs text-muted-foreground">
                • Scroll to zoom<br/>
                • Drag to pan<br/>
                • Hover for details<br/>
                • Click to select
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="absolute bottom-4 left-4 glass-subtle p-4 rounded-2xl text-sm max-w-xs z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-accent font-medium mb-2">Multi-Level Tree:</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>🌳 Unlimited nesting depth</div>
            <div>📋 JSON configurable nodes</div>
            <div>🔗 Auto-generated connections</div>
            <div>⚡ Dynamic unlocking system</div>
          </div>
        </motion.div>

        {/* Configuration Info */}
        <motion.div
          className="absolute top-4 left-4 glass-subtle p-3 rounded-2xl text-xs z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="text-accent font-medium mb-1">Config Status:</div>
          <div className="text-muted-foreground">
            {configUrl ? `Loaded from: ${configUrl}` : 'Using default config'}
          </div>
          <div className="text-muted-foreground">
            Nodes: {nodes.length} | Max Level: {Math.max(...nodes.map(n => n.level))}
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <motion.div
        className="flex justify-center space-x-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          className="btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setSelectedNodes(new Set());
            setUnlockedNodes(new Set(['center']));
            setActiveConnections(new Set());
          }}
        >
          Reset Selection
        </motion.button>
        
        {selectedNodes.size > 0 && (
          <motion.button
            className="btn-primary hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Get Quote ({selectedNodes.size} features)
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default SpiderWebPricing;