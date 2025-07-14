'use client';

import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../providers/TranslationProvider';

interface PricingNode {
  id: string;
  label: string;
  description: string;
  position: { x: number; y: number };
  parentId?: string;
  unlocked: boolean;
  selected: boolean;
  sector: 'web' | 'mobile' | 'integration' | 'devops' | 'center';
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const SpiderWebPricing: React.FC = () => {
  const { t } = useTranslation();
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set(['center']));
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Pan and zoom state
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Define all nodes with better spacing
  const initialNodes: PricingNode[] = useMemo(() => [
    // Center node
    {
      id: 'center',
      label: 'Start Here',
      description: 'Choose your development path to unlock features',
      position: { x: 700, y: 400 },
      sector: 'center',
      unlocked: true,
      selected: false
    },

    // Web sector (top-right)
    {
      id: 'web-main',
      label: 'Web Development',
      description: 'Modern, responsive web applications and websites',
      position: { x: 950, y: 200 },
      parentId: 'center',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-landing',
      label: 'Landing Page',
      description: 'Professional single-page website with modern design',
      position: { x: 1150, y: 120 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-ecommerce',
      label: 'E-commerce Store',
      description: 'Full-featured online store with payment integration',
      position: { x: 1200, y: 280 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-dashboard',
      label: 'Admin Dashboard',
      description: 'Comprehensive management interface with analytics',
      position: { x: 1050, y: 80 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-portfolio',
      label: 'Portfolio Site',
      description: 'Showcase your work with an elegant portfolio',
      position: { x: 1250, y: 180 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },

    // Mobile sector (bottom-right)
    {
      id: 'mobile-main',
      label: 'Mobile Development',
      description: 'Native and cross-platform mobile applications',
      position: { x: 950, y: 600 },
      parentId: 'center',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-ios',
      label: 'iOS App',
      description: 'Native iOS application with App Store optimization',
      position: { x: 1150, y: 680 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-android',
      label: 'Android App',
      description: 'Native Android app with Google Play optimization',
      position: { x: 1200, y: 520 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-cross',
      label: 'Cross-Platform',
      description: 'React Native or Flutter app for both platforms',
      position: { x: 1050, y: 720 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-ui',
      label: 'UI/UX Design',
      description: 'Professional mobile app design and user experience',
      position: { x: 1250, y: 620 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },

    // Integration sector (left)
    {
      id: 'integration-main',
      label: 'System Integration',
      description: 'Connect and synchronize your existing systems',
      position: { x: 450, y: 400 },
      parentId: 'center',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-api',
      label: 'API Development',
      description: 'Custom REST, GraphQL, or webhook integrations',
      position: { x: 250, y: 320 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-payment',
      label: 'Payment Gateway',
      description: 'Secure payment processing with multiple providers',
      position: { x: 200, y: 480 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-crm',
      label: 'CRM Integration',
      description: 'Connect with Salesforce, HubSpot, or custom CRM',
      position: { x: 280, y: 550 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-database',
      label: 'Database Setup',
      description: 'Database design, optimization, and migration',
      position: { x: 150, y: 350 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    },

    // DevOps sector (top-left)
    {
      id: 'devops-main',
      label: 'DevOps & Cloud',
      description: 'Infrastructure, deployment, and monitoring solutions',
      position: { x: 450, y: 200 },
      parentId: 'center',
      sector: 'devops',
      unlocked: false,
      selected: false
    },
    {
      id: 'devops-hosting',
      label: 'Cloud Hosting',
      description: 'AWS, GCP, or Azure deployment and management',
      position: { x: 280, y: 120 },
      parentId: 'devops-main',
      sector: 'devops',
      unlocked: false,
      selected: false
    },
    {
      id: 'devops-ci',
      label: 'CI/CD Pipeline',
      description: 'Automated testing, building, and deployment',
      position: { x: 550, y: 80 },
      parentId: 'devops-main',
      sector: 'devops',
      unlocked: false,
      selected: false
    },
    {
      id: 'devops-monitoring',
      label: 'Monitoring & Analytics',
      description: 'Performance monitoring and error tracking',
      position: { x: 350, y: 100 },
      parentId: 'devops-main',
      sector: 'devops',
      unlocked: false,
      selected: false
    }
  ], []);

  const [nodes] = useState<PricingNode[]>(initialNodes);

  // Define connections
  const connections: Connection[] = useMemo(() => [
    // Main sector connections
    { from: 'center', to: 'web-main', active: false },
    { from: 'center', to: 'mobile-main', active: false },
    { from: 'center', to: 'integration-main', active: false },
    { from: 'center', to: 'devops-main', active: false },
    
    // Web subsector connections
    { from: 'web-main', to: 'web-landing', active: false },
    { from: 'web-main', to: 'web-ecommerce', active: false },
    { from: 'web-main', to: 'web-dashboard', active: false },
    { from: 'web-main', to: 'web-portfolio', active: false },
    
    // Mobile subsector connections
    { from: 'mobile-main', to: 'mobile-ios', active: false },
    { from: 'mobile-main', to: 'mobile-android', active: false },
    { from: 'mobile-main', to: 'mobile-cross', active: false },
    { from: 'mobile-main', to: 'mobile-ui', active: false },
    
    // Integration subsector connections
    { from: 'integration-main', to: 'integration-api', active: false },
    { from: 'integration-main', to: 'integration-payment', active: false },
    { from: 'integration-main', to: 'integration-crm', active: false },
    { from: 'integration-main', to: 'integration-database', active: false },
    
    // DevOps subsector connections
    { from: 'devops-main', to: 'devops-hosting', active: false },
    { from: 'devops-main', to: 'devops-ci', active: false },
    { from: 'devops-main', to: 'devops-monitoring', active: false },
    
    // Cross-sector synergy connections
    { from: 'web-ecommerce', to: 'integration-payment', active: false },
    { from: 'mobile-ios', to: 'integration-api', active: false },
    { from: 'mobile-android', to: 'integration-api', active: false },
    { from: 'web-main', to: 'devops-hosting', active: false },
    { from: 'mobile-main', to: 'devops-ci', active: false }
  ], []);

  // Mouse tracking for hover tooltips
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }

    // Handle panning
    if (isDragging) {
      setTransform(prev => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  }, [isDragging, dragStart]);

  // Pan and zoom handlers
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

  // Handle node selection
  const handleNodeClick = useCallback((nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !unlockedNodes.has(nodeId)) return;

    const newSelectedNodes = new Set(selectedNodes);
    const newUnlockedNodes = new Set(unlockedNodes);
    const newActiveConnections = new Set(activeConnections);

    if (selectedNodes.has(nodeId)) {
      // Deselect node and its children
      newSelectedNodes.delete(nodeId);
      
      const children = nodes.filter(n => n.parentId === nodeId);
      children.forEach(child => {
        newSelectedNodes.delete(child.id);
        newUnlockedNodes.delete(child.id);
        newActiveConnections.delete(`${nodeId}-${child.id}`);
      });
    } else {
      // Select node
      newSelectedNodes.add(nodeId);
      newActiveConnections.add(`center-${nodeId}`);

      // Unlock child nodes
      const children = nodes.filter(n => n.parentId === nodeId);
      children.forEach(child => {
        newUnlockedNodes.add(child.id);
        newActiveConnections.add(`${nodeId}-${child.id}`);
      });
    }

    setSelectedNodes(newSelectedNodes);
    setUnlockedNodes(newUnlockedNodes);
    setActiveConnections(newActiveConnections);
  }, [nodes, selectedNodes, unlockedNodes, activeConnections]);

  // Handle node hover
  const handleNodeHover = useCallback((nodeId: string | null) => {
    setHoveredNode(nodeId);
  }, []);

  // Get connection path
  const getConnectionPath = useCallback((from: PricingNode, to: PricingNode) => {
    const midX = (from.position.x + to.position.x) / 2;
    const midY = (from.position.y + to.position.y) / 2;
    return `M ${from.position.x} ${from.position.y} Q ${midX} ${midY} ${to.position.x} ${to.position.y}`;
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

  return (
    <div className="w-full max-w-6xl mx-auto glass p-8 rounded-3xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{t('spiderWebPricing.interactiveBuilder')}</h3>
        <p className="text-muted-foreground">{t('spiderWebPricing.clickToExplore')}</p>
        <motion.div 
          className="mt-4 p-4 rounded-2xl bg-accent/10 border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm text-muted-foreground">{t('spiderWebPricing.estimatedTotal')}</div>
          <div className="text-2xl font-bold gradient-text">
            Rs. {totalPrice.toLocaleString()}
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
          Zoom: {Math.round(transform.scale * 100)}%
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
        {/* SVG for connections and nodes */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1400 800"
          className="absolute inset-0"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0'
          }}
        >
          {/* Render connections */}
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            
            if (!fromNode || !toNode) return null;

            const isActive = activeConnections.has(`${connection.from}-${connection.to}`) ||
                           (selectedNodes.has(connection.from) && unlockedNodes.has(connection.to));

            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={getConnectionPath(fromNode, toNode)}
                stroke={isActive ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.1)'}
                strokeWidth={isActive ? 2 : 1}
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isActive ? 1 : 0.3,
                  opacity: isActive ? 1 : 0.3
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node, index) => {
            const isUnlocked = unlockedNodes.has(node.id);
            const isSelected = selectedNodes.has(node.id);
            const isCenter = node.id === 'center';
            const isHovered = hoveredNode === node.id;

            return (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isUnlocked ? 1 : 0.6,
                  opacity: isUnlocked ? 1 : 0.3
                }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300
                }}
                className={`${isUnlocked ? 'cursor-pointer' : 'pointer-events-none'}`}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => isUnlocked && handleNodeHover(node.id)}
                onMouseLeave={() => handleNodeHover(null)}
              >
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={isCenter ? 25 : 20}
                  fill={
                    isCenter 
                      ? 'rgb(99, 102, 241)'
                      : isSelected 
                        ? 'rgb(99, 102, 241)' 
                        : isHovered
                          ? 'rgba(99, 102, 241, 0.6)'
                          : 'rgba(255, 255, 255, 0.1)'
                  }
                  stroke={isSelected ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.2)'}
                  strokeWidth={isSelected ? 3 : 1}
                  whileHover={{ 
                    scale: isUnlocked ? 1.1 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />

                {/* Unlock animation */}
                <AnimatePresence>
                  {isUnlocked && !isCenter && (
                    <motion.circle
                      cx={node.position.x}
                      cy={node.position.y}
                      r={20}
                      fill="none"
                      stroke="rgb(99, 102, 241)"
                      strokeWidth={2}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                {/* Node label */}
                <text
                  x={node.position.x}
                  y={node.position.y + 4}
                  textAnchor="middle"
                  className={`text-xs font-medium pointer-events-none ${
                    isSelected ? 'fill-white' : 'fill-white/80'
                  }`}
                  style={{ fontSize: '10px' }}
                >
                  {node.label.length > 12 ? node.label.substring(0, 12) + '...' : node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredNodeData && hoveredNode && (
            <motion.div
              className="absolute z-50 pointer-events-none"
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
              }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass-subtle p-4 rounded-2xl shadow-lg border border-accent/20 max-w-60">
                <h4 className="font-semibold text-accent mb-2">
                  {hoveredNodeData.label}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hoveredNodeData.description}
                </p>
                <div className="mt-2 text-xs text-accent/80">
                  Click to {selectedNodes.has(hoveredNodeData.id) ? 'deselect' : 'select'}
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
              <span>{t('spiderWebPricing.selected')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <span>{t('spiderWebPricing.available')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/10"></div>
              <span>{t('spiderWebPricing.locked')}</span>
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
          <div className="text-accent font-medium mb-2">{t('spiderWebPricing.howItWorks')}</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>{t('spiderWebPricing.step1')}</div>
            <div>{t('spiderWebPricing.step2')}</div>
            <div>{t('spiderWebPricing.step3')}</div>
            <div>{t('spiderWebPricing.step4')}</div>
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
          {t('spiderWebPricing.resetSelection')}
        </motion.button>
        
        {selectedNodes.size > 0 && (
          <motion.button
            className="btn-primary hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {t('spiderWebPricing.getQuote').replace('{total}', totalPrice.toLocaleString())}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(SpiderWebPricing);