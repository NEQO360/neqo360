import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingNode {
  id: string;
  label: string;
  price: number;
  description: string;
  position: { x: number; y: number };
  parentId?: string;
  unlocked: boolean;
  selected: boolean;
  sector: 'web' | 'mobile' | 'integration' | 'center';
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const SpiderWebPricing: React.FC = () => {
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [unlockedNodes, setUnlockedNodes] = useState<Set<string>>(new Set(['center']));
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set());

  // Define all nodes with their positions and relationships
  const initialNodes: PricingNode[] = useMemo(() => [
    // Center node
    {
      id: 'center',
      label: 'Start Here',
      price: 0,
      description: 'Choose your path',
      position: { x: 400, y: 300 },
      sector: 'center',
      unlocked: true,
      selected: false
    },

    // Web sector (top-right)
    {
      id: 'web-main',
      label: 'Web Development',
      price: 75000,
      description: 'Modern web applications',
      position: { x: 550, y: 150 },
      parentId: 'center',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-landing',
      label: 'Landing Page',
      price: 50000,
      description: 'Single page website',
      position: { x: 650, y: 100 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-ecommerce',
      label: 'E-commerce',
      price: 150000,
      description: 'Online store',
      position: { x: 700, y: 180 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },
    {
      id: 'web-dashboard',
      label: 'Admin Dashboard',
      price: 100000,
      description: 'Management interface',
      position: { x: 620, y: 80 },
      parentId: 'web-main',
      sector: 'web',
      unlocked: false,
      selected: false
    },

    // Mobile sector (bottom-right)
    {
      id: 'mobile-main',
      label: 'Mobile Development',
      price: 150000,
      description: 'Native & cross-platform apps',
      position: { x: 550, y: 450 },
      parentId: 'center',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-ios',
      label: 'iOS App',
      price: 200000,
      description: 'Native iOS application',
      position: { x: 650, y: 500 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-android',
      label: 'Android App',
      price: 180000,
      description: 'Native Android application',
      position: { x: 680, y: 420 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },
    {
      id: 'mobile-cross',
      label: 'Cross-Platform',
      price: 250000,
      description: 'React Native/Flutter',
      position: { x: 620, y: 520 },
      parentId: 'mobile-main',
      sector: 'mobile',
      unlocked: false,
      selected: false
    },

    // Integration sector (left)
    {
      id: 'integration-main',
      label: 'System Integration',
      price: 100000,
      description: 'Connect your systems',
      position: { x: 250, y: 300 },
      parentId: 'center',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-api',
      label: 'API Development',
      price: 80000,
      description: 'Custom REST/GraphQL APIs',
      position: { x: 150, y: 250 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-payment',
      label: 'Payment Gateway',
      price: 60000,
      description: 'Secure payment processing',
      position: { x: 120, y: 350 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    },
    {
      id: 'integration-crm',
      label: 'CRM Integration',
      price: 90000,
      description: 'Connect with existing CRM',
      position: { x: 180, y: 380 },
      parentId: 'integration-main',
      sector: 'integration',
      unlocked: false,
      selected: false
    }
  ], []);

  const [nodes, setNodes] = useState<PricingNode[]>(initialNodes);

  // Define connections between nodes
  const connections: Connection[] = useMemo(() => [
    // Main sector connections
    { from: 'center', to: 'web-main', active: false },
    { from: 'center', to: 'mobile-main', active: false },
    { from: 'center', to: 'integration-main', active: false },
    
    // Web subsector connections
    { from: 'web-main', to: 'web-landing', active: false },
    { from: 'web-main', to: 'web-ecommerce', active: false },
    { from: 'web-main', to: 'web-dashboard', active: false },
    
    // Mobile subsector connections
    { from: 'mobile-main', to: 'mobile-ios', active: false },
    { from: 'mobile-main', to: 'mobile-android', active: false },
    { from: 'mobile-main', to: 'mobile-cross', active: false },
    
    // Integration subsector connections
    { from: 'integration-main', to: 'integration-api', active: false },
    { from: 'integration-main', to: 'integration-payment', active: false },
    { from: 'integration-main', to: 'integration-crm', active: false },
    
    // Cross-sector synergy connections
    { from: 'web-ecommerce', to: 'integration-payment', active: false },
    { from: 'mobile-ios', to: 'integration-api', active: false },
    { from: 'mobile-android', to: 'integration-api', active: false }
  ], []);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return nodes
      .filter(node => selectedNodes.has(node.id) && node.id !== 'center')
      .reduce((sum, node) => sum + node.price, 0);
  }, [selectedNodes, nodes]);

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
      
      // Remove child nodes from unlocked and selected
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

  // Get connection path
  const getConnectionPath = useCallback((from: PricingNode, to: PricingNode) => {
    const midX = (from.position.x + to.position.x) / 2;
    const midY = (from.position.y + to.position.y) / 2;
    
    return `M ${from.position.x} ${from.position.y} Q ${midX} ${midY} ${to.position.x} ${to.position.y}`;
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto glass p-8 rounded-3xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Interactive Project Builder</h3>
        <p className="text-muted-foreground">Click to explore options and build your custom solution</p>
        <motion.div 
          className="mt-4 p-4 rounded-2xl bg-accent/10 border border-accent/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={totalPrice}
        >
          <div className="text-sm text-muted-foreground">Estimated Total</div>
          <div className="text-2xl font-bold gradient-text">
            Rs. {totalPrice.toLocaleString()}
          </div>
        </motion.div>
      </div>

      <div className="relative w-full h-[600px] overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 600"
          className="absolute inset-0"
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
                className="transition-all duration-300"
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node, index) => {
            const isUnlocked = unlockedNodes.has(node.id);
            const isSelected = selectedNodes.has(node.id);
            const isCenter = node.id === 'center';

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
                className={`cursor-pointer ${isUnlocked ? '' : 'pointer-events-none'}`}
                onClick={() => handleNodeClick(node.id)}
              >
                {/* Node circle */}
                <motion.circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={isCenter ? 25 : 20}
                  fill={
                    isCenter 
                      ? 'rgb(99, 102, 241)'
                      : isSelected 
                        ? 'rgb(99, 102, 241)' 
                        : 'rgba(255, 255, 255, 0.1)'
                  }
                  stroke={isSelected ? 'rgb(99, 102, 241)' : 'rgba(255, 255, 255, 0.2)'}
                  strokeWidth={isSelected ? 3 : 1}
                  whileHover={{ 
                    scale: isUnlocked ? 1.1 : 1,
                    fill: isUnlocked ? 'rgba(99, 102, 241, 0.8)' : undefined
                  }}
                  className="transition-all duration-200"
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

                {/* Price indicator */}
                {!isCenter && isUnlocked && (
                  <motion.text
                    x={node.position.x}
                    y={node.position.y - 35}
                    textAnchor="middle"
                    className="text-xs fill-accent font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Rs. {(node.price / 1000).toFixed(0)}k
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Node labels and descriptions */}
        {nodes.map((node) => {
          const isUnlocked = unlockedNodes.has(node.id);
          const isSelected = selectedNodes.has(node.id);

          if (!isUnlocked) return null;

          return (
            <motion.div
              key={`label-${node.id}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${(node.position.x / 800) * 100}%`,
                top: `${(node.position.y / 600) * 100}%`,
                marginTop: '45px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={`text-center p-2 rounded-lg backdrop-blur-sm transition-all duration-200 ${
                isSelected 
                  ? 'bg-accent/20 border border-accent/40' 
                  : 'bg-black/20'
              }`}>
                <div className={`text-sm font-medium ${
                  isSelected ? 'text-accent' : 'text-white'
                }`}>
                  {node.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1 max-w-24">
                  {node.description}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <motion.div
          className="absolute top-4 right-4 glass-subtle p-4 rounded-2xl text-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="space-y-2">
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
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="absolute bottom-4 left-4 glass-subtle p-4 rounded-2xl text-sm max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-accent font-medium mb-2">How it works:</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>1. Start from the center</div>
            <div>2. Click sectors to unlock options</div>
            <div>3. Select features to build your quote</div>
            <div>4. Watch the web grow with your choices</div>
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
            setSelectedNodes(new Set(['center']));
            setUnlockedNodes(new Set(['center']));
            setActiveConnections(new Set());
          }}
        >
          Reset Selection
        </motion.button>
        
        {totalPrice > 0 && (
          <motion.button
            className="btn-primary hover-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Get Quote for Rs. {totalPrice.toLocaleString()}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(SpiderWebPricing);