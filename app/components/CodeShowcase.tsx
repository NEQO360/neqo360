import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const categories = [
  {
    id: 'frameworks',
    name: 'Frameworks',
    items: [
      { name: 'Next.js', icon: '/icons/nextjs.svg' },
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Vue', icon: '/icons/vue.svg' },
      { name: 'Angular', icon: '/icons/angular.svg' },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    items: [
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'Java', icon: '/icons/java.svg' },
    ],
  },
  {
    id: 'hosting',
    name: 'Cloud & Hosting',
    items: [
      { name: 'Vercel', icon: '/icons/vercel.svg' },
      { name: 'AWS', icon: '/icons/aws.svg' },
      { name: 'GCP', icon: '/icons/gcp.svg' },
    ],
  },
];

const codeSnippets = {
  'Next.js': `// pages/api/data.ts
export default async function handler(req, res) {
  const data = await fetchData();
  res.status(200).json(data);
}

// app/page.tsx
export default function Page() {
  return (
    <div className="container">
      <h1>Welcome to Next.js</h1>
      <p>The React Framework for Production</p>
    </div>
  );
}`,
  'React': `// App.tsx
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className="app">
      {data.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
}`,
  'Vue': `<!-- App.vue -->
<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <button @click="count++">
      Count is: {{ count }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
const title = ref('Vue 3 App')
</script>`,
  'Angular': `// app.component.ts
@Component({
  selector: 'app-root',
  template: \`
    <div class="app">
      <h1>{{title}}</h1>
      <button (click)="increment()">
        Count: {{count}}
      </button>
    </div>
  \`
})
export class AppComponent {
  title = 'Angular App';
  count = 0;
  
  increment() {
    this.count++;
  }
}`,
  'TypeScript': `// types.ts
interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

type UserPreferences = {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

export class UserService {
  async getUser(id: string): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
}`,
  'Python': `# api/views.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int

@app.post("/users/")
async def create_user(user: User):
    try:
        # Store user in database
        result = await db.users.insert_one(user.dict())
        return {"id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))`,
  'Java': `// UserService.java
@Service
public class UserService {
    private final UserRepository repository;
    
    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
    
    @Transactional
    public User createUser(UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        
        return repository.save(user);
    }
}`,
  'Vercel': `// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url"
  }
}`,
  'AWS': `// serverless.yml
service: my-service
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1

functions:
  api:
    handler: src/handler.api
    events:
      - http:
          path: /api/{proxy+}
          method: ANY`,
  'GCP': `// app.yaml
runtime: nodejs18
env: standard

handlers:
  - url: /.*
    script: auto
    secure: always

env_variables:
  NODE_ENV: "production"
  DATABASE_URL: "$$DATABASE_URL"

automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 1
  max_instances: 10`,
};

export default function CodeShowcase() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeTechnology, setActiveTechnology] = useState(categories[0].items[0].name);
  const [codeProgress, setCodeProgress] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [techIndex, setTechIndex] = useState(0);

  useEffect(() => {
    const currentCategory = categories.find(cat => cat.id === activeCategory);
    if (!currentCategory) return;

    const techInterval = setInterval(() => {
      setTechIndex(current => {
        const nextIndex = (current + 1) % currentCategory.items.length;
        if (nextIndex === 0) {
          const currentCatIndex = categories.findIndex(cat => cat.id === activeCategory);
          const nextCatIndex = (currentCatIndex + 1) % categories.length;
          setActiveCategory(categories[nextCatIndex].id);
        }
        return nextIndex;
      });
    }, 8000);

    return () => clearInterval(techInterval);
  }, [activeCategory]);

  useEffect(() => {
    const currentCategory = categories.find(cat => cat.id === activeCategory);
    if (currentCategory && currentCategory.items[techIndex]) {
      setActiveTechnology(currentCategory.items[techIndex].name);
    }
  }, [activeCategory, techIndex]);

  useEffect(() => {
    const code = codeSnippets[activeTechnology as keyof typeof codeSnippets] || '';
    let currentIndex = 0;
    setIsTyping(true);
    setCodeProgress('');

    const typingInterval = setInterval(() => {
      if (currentIndex <= code.length) {
        setCodeProgress(code.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [activeTechnology]);

  const getLanguage = (tech: string) => {
    if (tech === 'Python') return 'python';
    if (tech === 'Java') return 'java';
    if (tech === 'Vercel') return 'json';
    if (['AWS', 'GCP'].includes(tech)) return 'yaml';
    return 'typescript';
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-muted-foreground">Production Ready</span>
        </div>
        <span className="text-sm text-muted-foreground">
          Expertise in 10+ frameworks and languages
        </span>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[350px] flex flex-col bg-gradient-to-br from-background/50 to-background">
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <motion.div 
                className="w-3 h-3 rounded-full bg-red-500/30 hover:bg-red-500 cursor-pointer"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-yellow-500/30 hover:bg-yellow-500 cursor-pointer"
                whileHover={{ scale: 1.2 }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-500/30 hover:bg-green-500 cursor-pointer"
                whileHover={{ scale: 1.2 }}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setTechIndex(0);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer relative ${
                  activeCategory === category.id
                    ? 'bg-accent text-white shadow-lg'
                    : 'text-muted-foreground bg-white/5 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
                {activeCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 bg-accent/20 rounded-full"
                    layoutId="category-pill"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="w-16" />
        </div>

        <div className="flex items-center justify-between px-6 py-2 bg-white/5 border-b border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTechnology}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-3"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <img 
                  src={categories.find(cat => cat.id === activeCategory)?.items[techIndex].icon} 
                  alt={activeTechnology} 
                  className={`w-5 h-5 ${activeTechnology === 'Next.js' ? 'invert' : ''}`} 
                />
              </div>
              <span className="text-sm font-medium">{activeTechnology}</span>
            </motion.div>
          </AnimatePresence>

          <span className="text-xs text-muted-foreground px-2 py-1 rounded-md bg-white/5">
            {getLanguage(activeTechnology)}
          </span>
        </div>

        <div className="flex-1 p-5 overflow-hidden">
          <SyntaxHighlighter
            language={getLanguage(activeTechnology)}
            style={atomDark}
            customStyle={{
              background: 'transparent',
              padding: 0,
              margin: 0,
              fontSize: '13px',
              height: '100%',
              overflow: 'hidden'
            }}
            showLineNumbers
            wrapLines
          >
            {codeProgress}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
        <span className="font-mono">Fast • Reliable • Scalable</span>
        <span>Supporting all major frameworks and languages</span>
      </div>
    </div>
  );
}

const styles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 