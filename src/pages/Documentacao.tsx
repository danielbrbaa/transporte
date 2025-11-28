import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Target, Wrench, BarChart3, Calendar, BookOpen } from "lucide-react";

export default function Documentacao() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Documentação do Sistema</h2>
        <p className="text-muted-foreground">
          Aplicação Web para Gerenciamento de Rotas e Entregas
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Objetivo Geral</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Desenvolver uma aplicação web funcional e escalável para o gerenciamento completo de rotas,
            entregas e motoristas, permitindo o acompanhamento em tempo real do status das entregas e
            facilitando a tomada de decisões operacionais através de dashboards analíticos.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <CardTitle>Objetivos Específicos</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>Implementar sistema completo de cadastro e gestão de motoristas (CRUD)</li>
            <li>Desenvolver módulo de criação e gerenciamento de rotas com associação de motoristas e clientes</li>
            <li>Criar sistema de rastreamento de entregas com 5 estados distintos de status</li>
            <li>Construir dashboard gerencial com métricas e visualizações gráficas</li>
            <li>Estabelecer camada de abstração de dados preparada para integração backend futura</li>
            <li>Garantir interface responsiva e acessível seguindo princípios de UX/UI modernos</li>
          </ul>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <CardTitle>Tecnologias Utilizadas</CardTitle>
          </div>
          <CardDescription>Stack técnica completa do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• React 18 com TypeScript</li>
                <li>• Vite para build e desenvolvimento</li>
                <li>• TailwindCSS para estilização</li>
                <li>• Shadcn/ui para componentes</li>
                <li>• React Router para navegação</li>
                <li>• Recharts para visualizações</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Arquitetura</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Single Page Application (SPA)</li>
                <li>• Camada de serviços com API mockada</li>
                <li>• LocalStorage para persistência</li>
                <li>• Design system customizado</li>
                <li>• Componentes modulares</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Metodologia de Desenvolvimento</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Abordagem</h4>
            <p className="text-sm text-muted-foreground">
              O desenvolvimento seguiu metodologia ágil com foco em MVP (Minimum Viable Product),
              priorizando funcionalidades essenciais e garantindo qualidade de código desde o início.
              Utilizou-se arquitetura em camadas para facilitar manutenção e evolução futura do sistema.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Padrões e Boas Práticas</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Componentização e reutilização de código</li>
              <li>• Design system com tokens semânticos</li>
              <li>• Separação clara entre lógica e apresentação</li>
              <li>• Tipagem forte com TypeScript</li>
              <li>• Responsividade mobile-first</li>
              <li>• Acessibilidade (WCAG)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Resultados Esperados</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Sistema funcional com todas as features especificadas implementadas</li>
            <li>✓ Interface intuitiva e profissional adequada ao domínio logístico</li>
            <li>✓ Operações CRUD completas para todas as entidades</li>
            <li>✓ Rastreamento de status com histórico de eventos</li>
            <li>✓ Dashboard com métricas e visualizações relevantes</li>
            <li>✓ Código limpo, organizado e preparado para escala</li>
            <li>✓ Experiência responsiva em diferentes dispositivos</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Cronograma de Desenvolvimento</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border-l-2 border-primary pl-4">
              <p className="font-semibold text-sm">Fase 1: Fundação (Semana 1-2)</p>
              <p className="text-sm text-muted-foreground">
                Setup do projeto, design system, estrutura de componentes e mock API
              </p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="font-semibold text-sm">Fase 2: Funcionalidades Core (Semana 3-4)</p>
              <p className="text-sm text-muted-foreground">
                Implementação dos módulos de motoristas, rotas e entregas
              </p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="font-semibold text-sm">Fase 3: Dashboard e Analytics (Semana 5)</p>
              <p className="text-sm text-muted-foreground">
                Desenvolvimento do dashboard gerencial com métricas e gráficos
              </p>
            </div>
            <div className="border-l-2 border-primary pl-4">
              <p className="font-semibold text-sm">Fase 4: Refinamento (Semana 6)</p>
              <p className="text-sm text-muted-foreground">
                Testes, ajustes de UX, otimizações e documentação final
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>Referências</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • REACT TEAM. React Documentation. Disponível em:{" "}
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://react.dev
              </a>
            </li>
            <li>
              • TAILWIND LABS. Tailwind CSS Documentation. Disponível em:{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://tailwindcss.com
              </a>
            </li>
            <li>
              • TYPESCRIPT TEAM. TypeScript Handbook. Disponível em:{" "}
              <a
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.typescriptlang.org
              </a>
            </li>
            <li>
              • NIELSEN NORMAN GROUP. UX Design Best Practices. Disponível em:{" "}
              <a
                href="https://www.nngroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://www.nngroup.com
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
