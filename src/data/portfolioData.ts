import { Competency, Project, AcademicCourse } from '../types';

export const COMPETENCIES_DATA: Competency[] = [
  {
    id: 'python',
    name: 'Python',
    iconType: 'python',
    description: 'Desarrollo de scripts, estructuras de datos fundamentales y resolución de problemas algorítmicos.',
    tag: 'Fundamentos',
    level: 'Intermedio Académico',
    details: {
      longDescription: 'Dominio de la sintaxis estándar de Python, comprensión de listas, diccionarios, tuplas, conjuntos, manipulación de archivos y programación modular orientada a objetos básica para la resolución sistemática de problemas.',
      keyConcepts: ['Tipos de datos estructurados', 'List Comprehensions', 'Algoritmos iterativos y recursivos', 'Manejo de excepciones', 'Modularización de scripts'],
      sampleLanguage: 'python',
      sampleCode: `# Algoritmo de Búsqueda Binaria Recursiva
def busqueda_binaria(arreglo: list[int], objetivo: int, inicio: int, fin: int) -> int:
    if inicio > fin:
        return -1  # No encontrado
    
    medio = (inicio + fin) // 2
    
    if arreglo[medio] == objetivo:
        return medio
    elif arreglo[medio] > objetivo:
        return busqueda_binaria(arreglo, objetivo, inicio, medio - 1)
    else:
        return busqueda_binaria(arreglo, objetivo, medio + 1, fin)

# Verificación de invariante estructural
datos = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
resultado = busqueda_binaria(datos, 23, 0, len(datos) - 1)
print(f"Índice del objetivo: {resultado}")`,
      pucvCourse: 'Programación / Introducción a la Computación'
    }
  },
  {
    id: 'algoritmos',
    name: 'Algoritmos',
    iconType: 'tree',
    description: 'Diseño y análisis de algoritmos eficientes para la manipulación y procesamiento estructurado de información.',
    tag: 'Lógica',
    level: 'Fundacional Robusto',
    details: {
      longDescription: 'Estudio de la complejidad asintótica (Notación Big-O), diseño de algoritmos de ordenamiento (MergeSort, QuickSort), búsqueda divide y vencerás, y optimización de flujos de control para minimizar el costo computacional.',
      keyConcepts: ['Notación Big-O (Tiempo y Espacio)', 'Divide y Vencerás', 'Ordenamientos asintóticos O(n log n)', 'Análisis de invariantes de bucle', 'Recursión vs Iteración'],
      sampleLanguage: 'python',
      sampleCode: `# QuickSort con pivote mediano y partición de Lomuto
def quicksort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr
    pivote = arr[len(arr) // 2]
    menores = [x for x in arr if x < pivote]
    iguales = [x for x in arr if x == pivote]
    mayores = [x for x in arr if x > pivote]
    return quicksort(menores) + iguales + quicksort(mayores)

# Complejidad temporal promedio: O(n log n)`,
      pucvCourse: 'Estructuras de Datos y Algoritmos'
    }
  },
  {
    id: 'logica',
    name: 'Lógica Computacional',
    iconType: 'memory',
    description: 'Bases matemáticas y estructurales para la comprensión profunda del flujo de ejecución de programas.',
    tag: 'Teoría',
    level: 'Analítico Formal',
    details: {
      longDescription: 'Aplicación del álgebra de Boole, lógica proposicional y de predicados de primer orden para demostrar la corrección de programas y diseñar circuitos lógicos combinacionales y secuenciales.',
      keyConcepts: ['Álgebra Booleana & Tablas de Verdad', 'Lógica Proposicional y Predicados', 'Demostración de corrección de código', 'Compuertas lógicas y autómata finito', 'Aritmética binaria y representación de memoria'],
      sampleLanguage: 'python',
      sampleCode: `# Verificador formal de implicación lógica (P -> Q <=> ~P v Q)
def implicacion_valida(p: bool, q: bool) -> bool:
    return (not p) or q

# Generador de tabla de verdad para equivalencias
print("P | Q | P -> Q | ~P v Q | Equivalentes?")
print("-" * 35)
for p in [True, False]:
    for q in [True, False]:
        imp = implicacion_valida(p, q)
        disy = (not p) or q
        print(f"{int(p)} | {int(q)} |   {int(imp)}    |    {int(disy)}   | {imp == disy}")`,
      pucvCourse: 'Lógica Computacional & Estructuras Discretas'
    }
  },
  {
    id: 'pseint',
    name: 'PSeInt',
    iconType: 'terminal',
    description: 'Modelado inicial de lógica de programación mediante pseudocódigo estructurado.',
    tag: 'Pseudocódigo',
    level: 'Modelado Estructurado',
    details: {
      longDescription: 'Uso de pseudocódigo formal y diagramas de flujo para abstraer problemas de ingeniería antes de la fase de codificación en lenguajes de producción, reforzando la claridad algorítmica.',
      keyConcepts: ['Estructuras de control secuenciales y condicionales', 'Bucles Mientras, Repetir y Para', 'Subprocesos y paso de parámetros', 'Arreglos unidimensionales y matrices'],
      sampleLanguage: 'plaintext',
      sampleCode: `// Algoritmo para cálculo de promedio ponderado estructural
Algoritmo CalculoIngenieria
    Definir notas Como Real
    Definir ponderaciones Como Real
    Dimension notas[3], ponderaciones[3]
    
    ponderaciones[1] <- 0.30
    ponderaciones[2] <- 0.35
    ponderaciones[3] <- 0.35
    
    notaFinal <- 0
    Para i <- 1 Hasta 3 Con Paso 1 Hacer
        Escribir "Ingrese nota de evaluación ", i, ":"
        Leer notas[i]
        notaFinal <- notaFinal + (notas[i] * ponderaciones[i])
    FinPara
    
    Escribir "Nota Final Ponderada: ", notaFinal
FinAlgoritmo`,
      pucvCourse: 'Fundamentos de Programación'
    }
  },
  {
    id: 'optimizacion',
    name: 'Optimización de Datos',
    iconType: 'database',
    description: 'Principios básicos para el manejo eficiente de recursos y estructuración de información técnica.',
    tag: 'Estructuras',
    level: 'Eficiencia y Memoria',
    details: {
      longDescription: 'Estudio y aplicación de estructuras de datos lineales (pilas, colas, listas enlazadas) y no lineales (árboles binarios de búsqueda), evaluando el impacto del acceso a memoria y la contención de espacio.',
      keyConcepts: ['Pilas (LIFO) y Colas (FIFO)', 'Listas simplemente y doblemente enlazadas', 'Árboles de búsqueda binaria (BST)', 'Matrices dispersas y serialización', 'Perfiles de consumo de memoria'],
      sampleLanguage: 'python',
      sampleCode: `# Implementación de Pila con verificación de desbordamiento
class PilaEstructural:
    def __init__(self, capacidad_maxima: int = 100):
        self.elementos = []
        self.capacidad = capacidad_maxima
    
    def push(self, item: int) -> bool:
        if len(self.elementos) >= self.capacidad:
            raise OverflowError("Pila en capacidad máxima")
        self.elementos.append(item)
        return True
        
    def pop(self) -> int:
        if not self.elementos:
            raise IndexError("Pila vacía")
        return self.elementos.pop()
        
    def peek(self) -> int:
        return self.elementos[-1] if self.elementos else None`,
      pucvCourse: 'Estructuras de Datos'
    }
  },
  {
    id: 'arquitectura',
    name: 'Arquitectura & C / Linux',
    iconType: 'cpu',
    description: 'Comprensión del hardware, gestión de memoria con punteros y herramientas Unix.',
    tag: 'Bajo Nivel',
    level: 'Arquitectura de Sistemas',
    details: {
      longDescription: 'Fundamentos de la arquitectura von Neumann, jerarquía de memorias (caché L1/L2/L3, RAM), punteros en C, terminal Bash y herramientas de automatización de compilación (Makefiles, GCC).',
      keyConcepts: ['Punteros y aritmética de direcciones', 'Gestión dinámica de memoria (malloc/free)', 'Terminal POSIX & Shell Scripting', 'Registros de CPU y Assembly x86_64 básico'],
      sampleLanguage: 'c',
      sampleCode: `// Demostración de asignación dinámica e invariante de puntero en C
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *bloque = (int*) malloc(n * sizeof(int));
    
    if (bloque == NULL) {
        fprintf(stderr, "Fallo en reserva de memoria\\n");
        return 1;
    }
    
    for (int i = 0; i < n; i++) {
        *(bloque + i) = (i + 1) * 10;
    }
    
    // Liberación estricta para evitar fugas de memoria
    free(bloque);
    bloque = NULL;
    return 0;
}`,
      pucvCourse: 'Organización de Computadores'
    }
  }
];

export const ACADEMIC_COURSES: AcademicCourse[] = [
  {
    code: 'INF-101',
    name: 'Introducción a la Ingeniería Informática',
    semester: 1,
    status: 'completed',
    category: 'engineering',
    credits: 4,
    description: 'Panorama general de la disciplina, ética profesional y ciclo de vida de soluciones computacionales.'
  },
  {
    code: 'MAT-111',
    name: 'Cálculo Diferencial',
    semester: 1,
    status: 'completed',
    category: 'math',
    credits: 5,
    description: 'Límites, continuidad, derivadas y optimización de funciones aplicadas a modelos de ingeniería.'
  },
  {
    code: 'MAT-121',
    name: 'Álgebra Lineal & Geometría Analítica',
    semester: 1,
    status: 'completed',
    category: 'math',
    credits: 5,
    description: 'Espacios vectoriales, transformaciones lineales, matrices y resolución de sistemas lineales.'
  },
  {
    code: 'INF-112',
    name: 'Fundamentos de Programación',
    semester: 1,
    status: 'completed',
    category: 'programming',
    credits: 5,
    description: 'Lógica estructurada, algoritmos con PSeInt y primeros programas en Python.'
  },
  {
    code: 'INF-201',
    name: 'Programación Estructurada y Orientada a Objetos',
    semester: 2,
    status: 'in-progress',
    category: 'programming',
    credits: 5,
    description: 'Paradigma POO, encapsulamiento, polimorfismo, manejo de memoria y modularidad en Python y C++.'
  },
  {
    code: 'MAT-211',
    name: 'Cálculo Integral y Series',
    semester: 2,
    status: 'in-progress',
    category: 'math',
    credits: 5,
    description: 'Técnicas de integración, integrales impropias y análisis de convergencia de series numéricas.'
  },
  {
    code: 'INF-222',
    name: 'Lógica Computacional & Estructuras Discretas',
    semester: 2,
    status: 'in-progress',
    category: 'math',
    credits: 4,
    description: 'Lógica proposicional, relaciones, teoría de grafos y combinatoria para ciencias de la computación.'
  },
  {
    code: 'FIS-101',
    name: 'Física General: Mecánica',
    semester: 2,
    status: 'in-progress',
    category: 'engineering',
    credits: 4,
    description: 'Cinemática, dinámica newtoniana, leyes de conservación de energía y trabajo mecánico.'
  },
  {
    code: 'INF-301',
    name: 'Estructuras de Datos y Algoritmos',
    semester: 3,
    status: 'upcoming',
    category: 'programming',
    credits: 5,
    description: 'Estructuras avanzadas, árboles balanceados AVL/Rojo-Negro, grafos y algoritmos de optimización.'
  },
  {
    code: 'INF-312',
    name: 'Arquitectura y Organización de Computadores',
    semester: 3,
    status: 'upcoming',
    category: 'hardware',
    credits: 4,
    description: 'Diseño lógico digital, procesadores RISC/CISC, pipeline y jerarquía de memoria.'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-algo-visualizer',
    title: 'Visualizador de Algoritmos de Ordenamiento',
    category: 'Algoritmos & Estructuras',
    description: 'Herramienta interactiva para analizar el comportamiento visual y la cantidad de comparaciones/intercambios entre BubbleSort, QuickSort e InsertionSort en tiempo real.',
    technologies: ['Python', 'TypeScript', 'React', 'Canvas API'],
    metrics: 'O(n log n) análisis asintótico',
    demoAvailable: true,
    githubUrl: 'https://github.com/juansalinas/sorting-visualizer'
  },
  {
    id: 'proj-logic-gate-sim',
    title: 'Simulador de Compuertas Lógicas y Tablas de Verdad',
    category: 'Lógica Computacional',
    description: 'Motor de evaluación de expresiones booleanas complejas con generador automático de tablas de verdad y minimización mediante mapas de Karnaugh.',
    technologies: ['Python', 'Álgebra Booleana', 'Estructuras Discretas'],
    metrics: '100% verificación de tautologías',
    demoAvailable: true,
    githubUrl: 'https://github.com/juansalinas/boolean-truth-engine'
  },
  {
    id: 'proj-pseint-transpiler',
    title: 'Transpilador PSeInt a Python AST',
    category: 'Compiladores & Sintaxis',
    description: 'Prototipo de parser de código que traduce estructuras de pseudocódigo en español (Si-Entonces, Mientras, Para) a código Python 3 idiomático y ejecutable.',
    technologies: ['Python', 'AST', 'Expresiones Regulares'],
    metrics: '94% cobertura de estructuras básicas',
    demoAvailable: true,
    githubUrl: 'https://github.com/juansalinas/pseint-to-python'
  }
];
