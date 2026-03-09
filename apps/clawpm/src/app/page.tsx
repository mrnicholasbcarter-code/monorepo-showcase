import { Button, Card } from '@monorepo/ui';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ocean-600 to-blue-600">
            ClawPM
          </h1>
          <p className="text-xl text-gray-600">
            AI-First Freelance Management Platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card hover>
            <h3 className="text-lg font-semibold mb-2">🤖 AI Agents</h3>
            <p className="text-gray-600 text-sm">
              Spawn specialized agents to handle proposals, outreach, and project management
            </p>
          </Card>

          <Card hover>
            <h3 className="text-lg font-semibold mb-2">📊 Smart Tracking</h3>
            <p className="text-gray-600 text-sm">
              Real-time dashboards with ML-powered predictions and insights
            </p>
          </Card>

          <Card hover>
            <h3 className="text-lg font-semibold mb-2">⚡ Automation</h3>
            <p className="text-gray-600 text-sm">
              Auto-generate proposals, manage clients, and track financials in one place
            </p>
          </Card>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Button size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">View Demo</Button>
        </div>

        <div className="mt-12 p-6 bg-white/50 rounded-lg backdrop-blur">
          <p className="text-sm text-gray-500">
            🚧 Currently in development - v0.1.0
          </p>
        </div>
      </div>
    </main>
  );
}
