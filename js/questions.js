const questionsData = {
  matematica: {
    algebra: {
      facil: [
        {
          q: "¿Cuánto es 7 + 8 * 2?",
          options: ["30", "23", "28", "15"],
          answer: 1,
          explanation: "Siguiendo la jerarquía de operaciones, primero se resuelve la multiplicación: 8 * 2 = 16, y luego la suma: 7 + 16 = 23."
        },
        {
          q: "¿Cuál es la raíz cuadrada de 144?",
          options: ["11", "13", "12", "14"],
          answer: 2,
          explanation: "12 * 12 = 144. Por lo tanto, la raíz cuadrada principal de 144 es 12."
        },
        {
          q: "¿Cuánto es el 15% de 200?",
          options: ["25", "30", "35", "20"],
          answer: 1,
          explanation: "El 15% se calcula como (15 / 100) * 200 = 0.15 * 200 = 30."
        },
        {
          q: "¿Cuál es el valor de Pi (π) redondeado a dos decimales?",
          options: ["3.14", "3.16", "3.12", "3.15"],
          answer: 0,
          explanation: "El número Pi tiene infinitos decimales (3.14159265...). Redondeado a dos decimales es 3.14."
        },
        {
          q: "¿Cuál es el resultado de -15 + 23?",
          options: ["-8", "8", "38", "-38"],
          answer: 1,
          explanation: "Al sumar números con signos opuestos, se restan sus valores absolutos: 23 - 15 = 8, conservando el signo del mayor (+)."
        },
        {
          q: "¿Cuánto es el 50% de 360?",
          options: ["160", "175", "180", "190"],
          answer: 2,
          explanation: "El 50% equivale exactamente a la mitad del número: 360 / 2 = 180."
        },
        {
          q: "¿Cuál es el valor absoluto de |-47|?",
          options: ["-47", "47", "0", "1"],
          answer: 1,
          explanation: "El valor absoluto representa la distancia al cero en la recta numérica, por lo que siempre es positivo o cero: |-47| = 47."
        },
        {
          q: "¿Cuánto es 5 elevado al cubo (5^3)?",
          options: ["15", "75", "125", "25"],
          answer: 2,
          explanation: "5^3 significa multiplicar 5 por sí mismo tres veces: 5 * 5 * 5 = 25 * 5 = 125."
        },
        {
          q: "Si un paquete tiene 12 lápices, ¿cuántos lápices hay en 8 paquetes?",
          options: ["84", "96", "108", "92"],
          answer: 1,
          explanation: "Multiplicamos la cantidad de paquetes por lápices por paquete: 8 * 12 = 96."
        },
        {
          q: "¿Cuál es el resultado de 100 - (20 / 4) * 5?",
          options: ["75", "80", "25", "95"],
          answer: 0,
          explanation: "Primero el paréntesis: 20 / 4 = 5. Luego la multiplicación: 5 * 5 = 25. Finalmente la resta: 100 - 25 = 75."
        },
        {
          q: "¿Cuánto es 3/4 expresado en forma decimal?",
          options: ["0.34", "0.75", "0.50", "0.80"],
          answer: 1,
          explanation: "Dividiendo el numerador entre el denominador: 3 / 4 = 0.75."
        },
        {
          q: "¿Cuál es el doble de la tercera parte de 30?",
          options: ["10", "15", "20", "25"],
          answer: 2,
          explanation: "La tercera parte de 30 es 30 / 3 = 10. El doble de 10 es 10 * 2 = 20."
        }
      ],
      medio: [
        {
          q: "Encuentra el valor de x en: 3x - 6 = 12",
          options: ["x = 4", "x = 6", "x = 5", "x = 8"],
          answer: 1,
          explanation: "Sumando 6 a ambos lados: 3x = 18. Dividiendo entre 3: x = 18 / 3 = 6."
        },
        {
          q: "Si un artículo cuesta 80 Bs y tiene 25% de descuento, ¿cuánto se paga?",
          options: ["60 Bs", "55 Bs", "65 Bs", "50 Bs"],
          answer: 0,
          explanation: "El descuento es 25% de 80 = 20 Bs. El precio final a pagar es 80 - 20 = 60 Bs."
        },
        {
          q: "¿Cuál es el resultado de 2 elevado a la 5ª potencia (2^5)?",
          options: ["16", "32", "64", "25"],
          answer: 1,
          explanation: "2 * 2 * 2 * 2 * 2 = 4 * 2 * 2 * 2 = 8 * 2 * 2 = 16 * 2 = 32."
        },
        {
          q: "¿Cuál es el siguiente número primo después del 17?",
          options: ["19", "21", "23", "20"],
          answer: 0,
          explanation: "18 es divisible por 2; 19 solo es divisible entre 1 y sí mismo, por lo tanto 19 es el siguiente número primo."
        },
        {
          q: "Resuelve para x: 2(x + 4) = 24",
          options: ["x = 8", "x = 10", "x = 6", "x = 12"],
          answer: 0,
          explanation: "Dividiendo entre 2: x + 4 = 12. Restando 4: x = 12 - 4 = 8."
        },
        {
          q: "Factoriza la diferencia de cuadrados: x² - 49",
          options: ["(x - 7)(x - 7)", "(x + 7)(x - 7)", "(x + 49)(x - 1)", "(x - 14)(x + 14)"],
          answer: 1,
          explanation: "Por regla de diferencia de cuadrados: a² - b² = (a + b)(a - b). Aquí a = x y b = 7, luego (x + 7)(x - 7)."
        },
        {
          q: "Si 5 obreros tardan 10 días en una obra, ¿cuántos días tardarán 10 obreros al mismo ritmo?",
          options: ["5 días", "20 días", "7.5 días", "4 días"],
          answer: 0,
          explanation: "Es una regla de tres inversa: (5 obreros * 10 días) / 10 obreros = 50 / 10 = 5 días."
        },
        {
          q: "¿Cuál es el grado absoluto del polinomio: P(x) = 4x⁵ - 3x³ + 7x - 9?",
          options: ["3", "4", "5", "9"],
          answer: 2,
          explanation: "El grado absoluto de un polinomio de una sola variable es el exponente más alto de dicha variable, en este caso 5."
        },
        {
          q: "¿Cuál es el valor de x en: x/4 + 5 = 11?",
          options: ["20", "24", "16", "28"],
          answer: 1,
          explanation: "Restamos 5: x/4 = 11 - 5 = 6. Multiplicamos por 4: x = 6 * 4 = 24."
        },
        {
          q: "Simplifica la expresión: 3a + 5b - a + 2b",
          options: ["4a + 7b", "2a + 7b", "2a + 3b", "3a + 7b"],
          answer: 1,
          explanation: "Agrupamos términos semejantes: (3a - a) + (5b + 2b) = 2a + 7b."
        },
        {
          q: "¿Cuál es el área de un triángulo con base de 14 cm y altura de 6 cm?",
          options: ["84 cm²", "42 cm²", "48 cm²", "36 cm²"],
          answer: 1,
          explanation: "Fórmula del área del triángulo: (base * altura) / 2 = (14 * 6) / 2 = 84 / 2 = 42 cm²."
        },
        {
          q: "¿Qué porcentaje de 80 es 20?",
          options: ["20%", "25%", "30%", "15%"],
          answer: 1,
          explanation: "(20 / 80) * 100 = (1 / 4) * 100 = 25%."
        }
      ],
      dificil: [
        {
          q: "Resuelve el sistema: x + y = 10, x - y = 2. Halla el valor de x:",
          options: ["4", "5", "8", "6"],
          answer: 3,
          explanation: "Sumando ambas ecuaciones: 2x = 12 -> x = 6. Luego y = 10 - 6 = 4."
        },
        {
          q: "Resuelve la ecuación cuadrática: x² - 9 = 0. ¿Cuáles son los valores de x?",
          options: ["3 y -3", "9 y -9", "3 y 3", "0 y 9"],
          answer: 0,
          explanation: "Despejando: x² = 9 -> x = ±√9 -> x = 3 y x = -3."
        },
        {
          q: "Simplifica la expresión algebraica: (2x³ * 3x²) / x",
          options: ["6x⁴", "5x⁵", "6x⁵", "5x⁴"],
          answer: 0,
          explanation: "El numerador es 2 * 3 * x^(3+2) = 6x⁵. Al dividir entre x: 6x^(5-1) = 6x⁴."
        },
        {
          q: "Halla la suma de las raíces de la ecuación cuadrática: x² - 5x + 6 = 0",
          options: ["5", "6", "-5", "-6"],
          answer: 0,
          explanation: "Por las relaciones de Vieta, la suma de las raíces de ax² + bx + c = 0 es -b/a = -(-5)/1 = 5."
        },
        {
          q: "¿Cuál es el valor del discriminante de: 2x² - 4x + 2 = 0?",
          options: ["-8", "0", "16", "4"],
          answer: 1,
          explanation: "Fórmula del discriminante Δ = b² - 4ac. Δ = (-4)² - 4(2)(2) = 16 - 16 = 0 (raíz real única)."
        },
        {
          q: "Resuelve la inecuación: 4x - 7 > 2x + 5",
          options: ["x > 3", "x > 6", "x < 6", "x > 12"],
          answer: 1,
          explanation: "Restamos 2x: 2x - 7 > 5. Sumamos 7: 2x > 12. Dividimos entre 2: x > 6."
        },
        {
          q: "¿Cuál es el valor de log₂(32)?",
          options: ["4", "5", "6", "3"],
          answer: 1,
          explanation: "Por definición de logaritmo, 2 elevado a qué potencia es 32: 2^5 = 32, por lo tanto log₂(32) = 5."
        },
        {
          q: "Si f(x) = 2x² - 3x + 1, ¿cuánto vale f(-2)?",
          options: ["15", "7", "3", "11"],
          answer: 0,
          explanation: "f(-2) = 2(-2)² - 3(-2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15."
        },
        {
          q: "Factoriza completamente: 2x² + 7x + 3",
          options: ["(2x + 1)(x + 3)", "(2x + 3)(x + 1)", "(x + 7)(2x + 1)", "(2x - 1)(x - 3)"],
          answer: 0,
          explanation: "Multiplicando: (2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3."
        },
        {
          q: "Determina las raíces de: x² + 4x - 12 = 0",
          options: ["x = 2 y x = -6", "x = -2 y x = 6", "x = 3 y x = -4", "x = 4 y x = -3"],
          answer: 0,
          explanation: "Factorizando: (x + 6)(x - 2) = 0. Por lo tanto las raíces son x = -6 y x = 2."
        },
        {
          q: "Si la pendiente de una recta es m = -2 y pasa por (0, 4), ¿cuál es su ecuación?",
          options: ["y = -2x + 4", "y = 2x + 4", "y = -2x - 4", "y = 4x - 2"],
          answer: 0,
          explanation: "La ecuación pendiente-ordenada al origen es y = mx + b. Con m = -2 y b = 4 resulta y = -2x + 4."
        },
        {
          q: "¿Cuál es el valor del producto de las raíces de: 3x² - 9x + 15 = 0?",
          options: ["3", "5", "-5", "15"],
          answer: 1,
          explanation: "Por las relaciones de Vieta, el producto de las raíces de ax² + bx + c = 0 es c/a = 15 / 3 = 5."
        }
      ]
    },
    trigonometria: {
      facil: [
        {
          q: "¿Cuál es el valor exacto de sen(90°)?",
          options: ["0", "1", "-1", "0.5"],
          answer: 1,
          explanation: "En la circunferencia unitaria, a 90° la coordenada vertical 'y' es igual a 1, por tanto sen(90°) = 1."
        },
        {
          q: "¿Cuál es el valor de cos(0°)?",
          options: ["0", "-1", "1", "0.5"],
          answer: 2,
          explanation: "En el ángulo de 0°, el radio vector coincide con el eje x positivo en la circunferencia unitaria, por lo que cos(0°) = 1."
        },
        {
          q: "¿Cuál es el valor de sen(0°)?",
          options: ["1", "0", "-1", "0.5"],
          answer: 1,
          explanation: "En 0°, la coordenada vertical en el círculo trigonométrico es 0, luego sen(0°) = 0."
        },
        {
          q: "¿Cuánto mide la suma de los ángulos interiores de cualquier triángulo?",
          options: ["90°", "180°", "360°", "270°"],
          answer: 1,
          explanation: "En la geometría euclidiana plana, la suma de los tres ángulos interiores de cualquier triángulo es siempre 180°."
        },
        {
          q: "¿Cómo se llama el lado opuesto al ángulo recto en un triángulo rectángulo?",
          options: ["Cateto adyacente", "Cateto opuesto", "Hipotenusa", "Apotema"],
          answer: 2,
          explanation: "La hipotenusa es siempre el lado de mayor longitud y está ubicada frente al ángulo recto de 90°."
        },
        {
          q: "¿Cuánto mide un ángulo recto en grados sexagesimales?",
          options: ["45°", "90°", "180°", "60°"],
          answer: 1,
          explanation: "Un ángulo recto mide exactamente 90 grados sexagesimales."
        },
        {
          q: "¿A cuántos grados sexagesimales equivale una vuelta completa?",
          options: ["180°", "270°", "360°", "400°"],
          answer: 2,
          explanation: "Una rotación completa de una circunferencia equivale a 360 grados sexagesimales."
        },
        {
          q: "¿Cuál es el valor de cos(90°)?",
          options: ["1", "0", "-1", "0.5"],
          answer: 1,
          explanation: "A 90° la proyección sobre el eje horizontal x es cero, por lo tanto cos(90°) = 0."
        },
        {
          q: "Si dos ángulos suman 90°, ¿cómo se denominan?",
          options: ["Suplementarios", "Complementarios", "Adyacentes", "Opuestos"],
          answer: 1,
          explanation: "Dos ángulos cuya suma es exactamente 90° se llaman ángulos complementarios."
        },
        {
          q: "Si dos ángulos suman 180°, ¿cómo se denominan?",
          options: ["Complementarios", "Suplementarios", "Conjugados", "Agudos"],
          answer: 1,
          explanation: "Dos ángulos cuya suma totaliza 180° se denominan ángulos suplementarios."
        },
        {
          q: "¿Cuánto mide el tercer ángulo de un triángulo si los otros dos miden 50° y 70°?",
          options: ["50°", "60°", "70°", "80°"],
          answer: 1,
          explanation: "La suma total es 180°. Por tanto: 180° - (50° + 70°) = 180° - 120° = 60°."
        },
        {
          q: "¿Cuál es la función trigonométrica recíproca del seno?",
          options: ["Coseno", "Secante", "Cosecante", "Cotangente"],
          answer: 2,
          explanation: "La función cosecante (csc) es la recíproca del seno: csc(x) = 1 / sen(x)."
        }
      ],
      medio: [
        {
          q: "¿A cuánto equivale en radianes un ángulo de 180°?",
          options: ["π/2 rad", "π rad", "2π rad", "3π/2 rad"],
          answer: 1,
          explanation: "Por equivalencia trigonométrica estándar, 180 grados corresponden exactamente a π radianes."
        },
        {
          q: "¿Cuál es el valor exacto de tan(45°)?",
          options: ["0", "0.5", "1", "√3"],
          answer: 2,
          explanation: "En un triángulo rectángulo isósceles con ángulos de 45°, los catetos son iguales: tan(45°) = cateto opuesto / adyacente = 1."
        },
        {
          q: "En un triángulo rectángulo, ¿a qué es igual la tangente de un ángulo agudo?",
          options: ["Cateto opuesto / Cateto adyacente", "Hipotenusa / Cateto opuesto", "Cateto adyacente / Hipotenusa", "Cateto adyacente / Cateto opuesto"],
          answer: 0,
          explanation: "Por definición trigonométrica directa: Tangente = Cateto Opuesto / Cateto Adyacente."
        },
        {
          q: "¿En qué cuadrante tanto el seno como el coseno son positivos?",
          options: ["Cuadrante I", "Cuadrante II", "Cuadrante III", "Cuadrante IV"],
          answer: 0,
          explanation: "En el primer cuadrante (0° a 90°), x > 0 e y > 0, por lo que tanto sen(x) como cos(x) son positivos."
        },
        {
          q: "¿Cuál es el valor exacto de sen(30°)?",
          options: ["√3/2", "1/2", "1", "√2/2"],
          answer: 1,
          explanation: "El seno del ángulo notable de 30° es exactamente 1/2 (o 0.5)."
        },
        {
          q: "¿Cuál es el valor de cos(60°)?",
          options: ["1/2", "√3/2", "√2/2", "0"],
          answer: 0,
          explanation: "Dado que 30° y 60° son complementarios: cos(60°) = sen(30°) = 1/2 = 0.5."
        },
        {
          q: "¿A cuántos grados sexagesimales equivale π/2 radianes?",
          options: ["45°", "60°", "90°", "120°"],
          answer: 2,
          explanation: "Si π rad = 180°, entonces π/2 rad = 180° / 2 = 90°."
        },
        {
          q: "Si los catetos de un triángulo rectángulo miden 3 cm y 4 cm, ¿cuánto mide la hipotenusa?",
          options: ["5 cm", "6 cm", "7 cm", "4.5 cm"],
          answer: 0,
          explanation: "Por el Teorema de Pitágoras: h = √(3² + 4²) = √(9 + 16) = √25 = 5 cm."
        },
        {
          q: "¿Cuál es el signo del seno en el segundo cuadrante (90° a 180°)?",
          options: ["Positivo", "Negativo", "Cero", "Indefinido"],
          answer: 0,
          explanation: "En el segundo cuadrante, el eje vertical 'y' es positivo, por lo que la función seno siempre es positiva."
        },
        {
          q: "¿Cuál es la función trigonométrica recíproca del coseno?",
          options: ["Secante", "Cosecante", "Cotangente", "Seno"],
          answer: 0,
          explanation: "La función secante (sec) es la inversa multiplicativa del coseno: sec(x) = 1 / cos(x)."
        },
        {
          q: "¿Cuál es el valor de sen(45°)?",
          options: ["√2/2", "1/2", "√3/2", "1"],
          answer: 0,
          explanation: "En un ángulo de 45°, sen(45°) = cos(45°) = 1/√2 = √2/2 ≈ 0.7071."
        },
        {
          q: "¿A cuántos radianes equivalen 360 grados?",
          options: ["π rad", "2π rad", "3π rad", "4π rad"],
          answer: 1,
          explanation: "Una circunferencia completa equivale exactamente a 2π radianes (aproximadamente 6.2832 rad)."
        }
      ],
      dificil: [
        {
          q: "¿Cuál es la identidad trigonométrica fundamental pitagórica?",
          options: ["sen²(x) + cos²(x) = 1", "tan(x) = sen(x)/cos(x)", "sec²(x) = 1 + tan²(x)", "Todas las anteriores"],
          answer: 3,
          explanation: "sen²(x) + cos²(x) = 1 es la identidad fundamental pitagórica, y de ella derivan tan(x) = sen/cos y sec²(x) = 1 + tan²(x)."
        },
        {
          q: "¿Cuál es el valor exacto de cos(180°)?",
          options: ["0", "1", "-1", "No definido"],
          answer: 2,
          explanation: "A 180°, el punto sobre la circunferencia unitaria es (-1, 0), por lo que cos(180°) = -1."
        },
        {
          q: "Si sen(x) = 0.6 y cos(x) = 0.8, ¿cuánto vale tan(x)?",
          options: ["0.75", "1.33", "0.48", "1.4"],
          answer: 0,
          explanation: "tan(x) = sen(x) / cos(x) = 0.6 / 0.8 = 6 / 8 = 3 / 4 = 0.75."
        },
        {
          q: "¿Cuál es el periodo principal de la función estándar f(x) = sen(x)?",
          options: ["π", "2π", "π/2", "4π"],
          answer: 1,
          explanation: "La función seno repite sus valores cada vuelta completa a la circunferencia trigonométrica, es decir, cada 2π radianes."
        },
        {
          q: "¿Cuál es la fórmula de sen(2x) en términos de seno y coseno?",
          options: ["2 * sen(x) * cos(x)", "sen²(x) - cos²(x)", "2 * sen(x)", "sen(x) + cos(x)"],
          answer: 0,
          explanation: "Por la identidad del ángulo doble: sen(2x) = 2 * sen(x) * cos(x)."
        },
        {
          q: "¿Cuál es el valor de tan(90°)?",
          options: ["0", "1", "Indefinido", "-1"],
          answer: 2,
          explanation: "tan(90°) = sen(90°) / cos(90°) = 1 / 0. La división por cero no está definida en los números reales."
        },
        {
          q: "Si cos(x) = 5/13 en un ángulo agudo, ¿cuánto vale sen(x)?",
          options: ["12/13", "8/13", "10/13", "7/13"],
          answer: 0,
          explanation: "Por la identidad pitagórica: sen(x) = √(1 - cos²(x)) = √(1 - 25/169) = √(144/169) = 12/13."
        },
        {
          q: "¿Cuál es el periodo principal de la función f(x) = tan(x)?",
          options: ["2π", "π", "π/2", "4π"],
          answer: 1,
          explanation: "A diferencia del seno y coseno que tienen periodo 2π, la tangente tiene un periodo fundamental de π radianes."
        },
        {
          q: "¿Qué establece la Ley de los Cosenos para el lado c de cualquier triángulo?",
          options: ["c² = a² + b² - 2ab*cos(C)", "c² = a² + b² + 2ab*cos(C)", "c = a + b - cos(C)", "c² = a² - b²"],
          answer: 0,
          explanation: "La ley del coseno generaliza el teorema de Pitágoras: c² = a² + b² - 2ab*cos(C)."
        },
        {
          q: "Simplifica la expresión trigonométrica: sen(x) * csc(x)",
          options: ["0", "1", "tan(x)", "cot(x)"],
          answer: 1,
          explanation: "Dado que csc(x) = 1 / sen(x), al multiplicar sen(x) * (1 / sen(x)) el resultado es 1."
        },
        {
          q: "¿Cuál es el valor de sec(0°)?",
          options: ["0", "1", "-1", "Indefinido"],
          answer: 1,
          explanation: "sec(0°) = 1 / cos(0°) = 1 / 1 = 1."
        },
        {
          q: "¿A cuánto equivale cos(2x) expresado con cos² y sen²?",
          options: ["cos²(x) - sen²(x)", "cos²(x) + sen²(x)", "2*cos(x)", "sen²(x) - cos²(x)"],
          answer: 0,
          explanation: "Por identidad del ángulo doble para el coseno: cos(2x) = cos²(x) - sen²(x)."
        }
      ]
    }
  },
  programacion: {
    junior: [
      {
        q: "Desafío Junior 1: Imprime exactamente el texto 'Hola UPEA' en pantalla.",
        expected: "Hola UPEA",
        starter: "",
        solution: "print('Hola UPEA')",
        explanation: "En Python la función nativa print() permite mostrar cadenas de texto entre comillas simples o dobles: print('Hola UPEA')."
      },
      {
        q: "Desafío Junior 2: Suma 45 + 55 e imprime el resultado.",
        expected: "100",
        starter: "",
        solution: "print(45 + 55)",
        explanation: "El operador aritmético '+' suma ambos valores numéricos enteros. print(45 + 55) evalúa y muestra 100."
      },
      {
        q: "Desafío Junior 3: Declara base = 10 y altura = 5, luego imprime el área del rectángulo (base * altura).",
        expected: "50",
        starter: "",
        solution: "base = 10\naltura = 5\nprint(base * altura)",
        explanation: "Asignamos las variables y multiplicamos con el operador '*': base * altura resulta en 50."
      },
      {
        q: "Desafío Junior 4: Concatena los textos 'Ingenieria ' y 'Sistemas' e imprime el resultado.",
        expected: "Ingenieria Sistemas",
        starter: "",
        solution: "print('Ingenieria ' + 'Sistemas')",
        explanation: "En Python el operador '+' entre cadenas de texto realiza una concatenación: 'Ingenieria ' + 'Sistemas' une ambas frases."
      },
      {
        q: "Desafío Junior 5: Calcula y muestra la multiplicación de 7 por 8.",
        expected: "56",
        starter: "",
        solution: "print(7 * 8)",
        explanation: "La multiplicación en Python se efectúa con el asterisco '*': 7 * 8 da como resultado 56."
      },
      {
        q: "Desafío Junior 6: Calcula e imprime la división entera de 17 entre 3 (usa //).",
        expected: "5",
        starter: "",
        solution: "print(17 // 3)",
        explanation: "El operador de doble barra '//' calcula el cociente entero descartando la parte decimal: 17 // 3 = 5."
      },
      {
        q: "Desafío Junior 7: Obtén el residuo o módulo de dividir 29 entre 5 (usa %).",
        expected: "4",
        starter: "",
        solution: "print(29 % 5)",
        explanation: "El operador de porcentaje '%' calcula el residuo de la división: 29 = 5 * 5 + 4, por lo que el residuo es 4."
      },
      {
        q: "Desafío Junior 8: Calcula 2 elevado a la 4ª potencia utilizando el operador de exponenciación (**).",
        expected: "16",
        starter: "",
        solution: "print(2 ** 4)",
        explanation: "El operador de doble asterisco '**' realiza potenciación en Python: 2 ** 4 = 16."
      },
      {
        q: "Desafío Junior 9: Convierte el número flotante 9.8 a entero usando int() e imprime el resultado.",
        expected: "9",
        starter: "",
        solution: "print(int(9.8))",
        explanation: "La función int() trunca la parte decimal de un número flotante, convirtiendo 9.8 a 9."
      },
      {
        q: "Desafío Junior 10: Imprime la longitud de la cadena 'Informatica' usando la función len().",
        expected: "11",
        starter: "",
        solution: "print(len('Informatica'))",
        explanation: "La función incorporada len() cuenta la cantidad de caracteres de una cadena. 'Informatica' contiene 11 letras."
      },
      {
        q: "Desafío Junior 11: Declara una variable x = 20, réstale 6 e imprime el valor final de x.",
        expected: "14",
        starter: "",
        solution: "x = 20\nx = x - 6\nprint(x)",
        explanation: "Asignamos 20 a x, luego actualizamos su valor restándole 6 para obtener 14 e imprimirlo."
      },
      {
        q: "Desafío Junior 12: Imprime el texto 'UPEA 2026' combinando la palabra 'UPEA' y el número 2026.",
        expected: "UPEA 2026",
        starter: "",
        solution: "print('UPEA', 2026)",
        explanation: "Al pasar múltiples argumentos separados por coma a print(), Python los imprime separados por un espacio: 'UPEA 2026'."
      }
    ],
    senior: [
      {
        q: "Desafío Senior 1: Utiliza un bucle for con range() para imprimir los números 1, 2 y 3 (uno por línea).",
        expected: "1\n2\n3",
        starter: "",
        solution: "for i in range(1, 4):\n    print(i)",
        explanation: "range(1, 4) genera una secuencia desde 1 hasta 3 (el límite superior es excluyente). El bucle for itera e imprime cada valor."
      },
      {
        q: "Desafío Senior 2: Define una función sumar(a, b) que retorne la suma. Llama a la función con 12 y 8 e imprime el resultado.",
        expected: "20",
        starter: "",
        solution: "def sumar(a, b):\n    return a + b\nprint(sumar(12, 8))",
        explanation: "Las funciones se definen con 'def' y devuelven valores con 'return'. Al invocar sumar(12, 8) obtenemos 20."
      },
      {
        q: "Desafío Senior 3: Declara edad = 20. Con una estructura if edad >= 18 imprime 'Mayor de edad'.",
        expected: "Mayor de edad",
        starter: "",
        solution: "edad = 20\nif edad >= 18:\n    print('Mayor de edad')",
        explanation: "La sentencia condicional 'if' verifica si edad (20) es mayor o igual a 18, ejecutando el bloque identado."
      },
      {
        q: "Desafío Senior 4: Crea una lista numeros = [10, 20, 30], agrega el número 40 con append() e imprime la lista.",
        expected: "[10, 20, 30, 40]",
        starter: "",
        solution: "numeros = [10, 20, 30]\nnumeros.append(40)\nprint(numeros)",
        explanation: "El método append() inserta un nuevo elemento al final de la lista mutable existente en Python."
      },
      {
        q: "Desafío Senior 5: Crea una función cuadrado(n) que retorne n * n. Imprime el resultado de cuadrado(6).",
        expected: "36",
        starter: "",
        solution: "def cuadrado(n):\n    return n * n\nprint(cuadrado(6))",
        explanation: "La función toma el argumento n y retorna su multiplicación por sí mismo: 6 * 6 = 36."
      },
      {
        q: "Desafío Senior 6: Encuentra e imprime el número máximo de la lista [15, 42, 8, 99, 23] usando max().",
        expected: "99",
        starter: "",
        solution: "valores = [15, 42, 8, 99, 23]\nprint(max(valores))",
        explanation: "La función predefinida max() recorre una colección iterable y devuelve el elemento de mayor magnitud (99)."
      },
      {
        q: "Desafío Senior 7: Con un bucle while, imprime los números del 1 al 3 (uno por línea).",
        expected: "1\n2\n3",
        starter: "",
        solution: "i = 1\nwhile i <= 3:\n    print(i)\n    i += 1",
        explanation: "El ciclo while se repite mientras la condición i <= 3 sea verdadera, incrementando i en 1 en cada iteración."
      },
      {
        q: "Desafío Senior 8: Suma todos los elementos de la lista [5, 10, 15, 20] usando la función sum() e imprime el resultado.",
        expected: "50",
        starter: "",
        solution: "numeros = [5, 10, 15, 20]\nprint(sum(numeros))",
        explanation: "La función sum() suma todos los valores numéricos contenidos en un iterable: 5 + 10 + 15 + 20 = 50."
      },
      {
        q: "Desafío Senior 9: Crea un diccionario con la clave 'carrera': 'Sistemas' e imprime el valor de esa clave.",
        expected: "Sistemas",
        starter: "",
        solution: "datos = {'carrera': 'Sistemas'}\nprint(datos['carrera'])",
        explanation: "Los diccionarios almacenan pares clave-valor. Accedemos al valor asociado indexando con la clave: datos['carrera']."
      },
      {
        q: "Desafío Senior 10: Define una función es_par(num) que retorne True si num es divisible entre 2. Imprime es_par(8).",
        expected: "True",
        starter: "",
        solution: "def es_par(num):\n    return num % 2 == 0\nprint(es_par(8))",
        explanation: "El operador % 2 evalúa si no hay residuo. Al ser 8 divisible exactamente entre 2, retorna el booleano True."
      },
      {
        q: "Desafío Senior 11: Imprime la lista de frutas ['manzana', 'platano', 'uva'] en orden inverso usando reverse o corte [::-1].",
        expected: "['uva', 'platano', 'manzana']",
        starter: "",
        solution: "frutas = ['manzana', 'platano', 'uva']\nprint(frutas[::-1])",
        explanation: "La notación de rebanado [::-1] invierte el orden de la colección secuencial de manera concisa."
      },
      {
        q: "Desafío Senior 12: Itera con un for sobre la lista [2, 4, 6] e imprime el doble de cada número en líneas separadas.",
        expected: "4\n8\n12",
        starter: "",
        solution: "for n in [2, 4, 6]:\n    print(n * 2)",
        explanation: "El bucle for toma cada elemento de la lista y muestra su multiplicación por 2."
      }
    ],
    avanzado: [
      {
        q: "Desafío Avanzado 1: Define una clase Sistema con un atributo de instancia carrera = 'Sistemas'. Instancia el objeto e imprime el atributo.",
        expected: "Sistemas",
        starter: "",
        solution: "class Sistema:\n    def __init__(self):\n        self.carrera = 'Sistemas'\ns = Sistema()\nprint(s.carrera)",
        explanation: "En la Programación Orientada a Objetos en Python, __init__ es el constructor que inicializa los atributos de instancia del objeto."
      },
      {
        q: "Desafío Avanzado 2: Crea una clase Persona con un método saludar() que retorne 'Hola desde UPEA'. Crea un objeto e imprime el saludo.",
        expected: "Hola desde UPEA",
        starter: "",
        solution: "class Persona:\n    def saludar(self):\n        return 'Hola desde UPEA'\np = Persona()\nprint(p.saludar())",
        explanation: "Los métodos de clase reciben 'self' como primer parámetro para hacer referencia a la instancia que invoca el método."
      },
      {
        q: "Desafío Avanzado 3 (Herencia): Crea una clase base Animal y una subclase Perro con método hablar() que retorne 'Guau'. Imprime perro.hablar().",
        expected: "Guau",
        starter: "",
        solution: "class Animal:\n    pass\nclass Perro(Animal):\n    def hablar(self):\n        return 'Guau'\np = Perro()\nprint(p.hablar())",
        explanation: "La herencia en Python se especifica colocando la clase padre entre paréntesis: class Perro(Animal)."
      },
      {
        q: "Desafío Avanzado 4 (List Comprehension): Genera una lista con los cuadrados de [1, 2, 3, 4] usando comprensión de listas e imprímela.",
        expected: "[1, 4, 9, 16]",
        starter: "",
        solution: "cuadrados = [x**2 for x in [1, 2, 3, 4]]\nprint(cuadrados)",
        explanation: "La comprensión de listas permite crear nuevas listas aplicando una expresión a cada elemento: [x**2 for x in lista]."
      },
      {
        q: "Desafío Avanzado 5 (Encapsulamiento): Crea una clase Cuenta con atributo protegido _saldo = 100 y un método get_saldo() que lo retorne. Imprímelo.",
        expected: "100",
        starter: "",
        solution: "class Cuenta:\n    def __init__(self):\n        self._saldo = 100\n    def get_saldo(self):\n        return self._saldo\nc = Cuenta()\nprint(c.get_saldo())",
        explanation: "Por convención, un prefijo con guión bajo indica que el atributo debe ser accedido mediante métodos accesores (getters)."
      },
      {
        q: "Desafío Avanzado 6 (Polimorfismo): Crea las clases Gato y Perro, ambas con el método emitir_sonido() retornando 'Miau' y 'Guau' respectivamente. Llama al método de Gato e imprímelo.",
        expected: "Miau",
        starter: "",
        solution: "class Gato:\n    def emitir_sonido(self):\n        return 'Miau'\nclass Perro:\n    def emitir_sonido(self):\n        return 'Guau'\ng = Gato()\nprint(g.emitir_sonido())",
        explanation: "El polimorfismo permite que distintos objetos respondan al mismo nombre de método con comportamientos específicos."
      },
      {
        q: "Desafío Avanzado 7: Usa una función lambda para multiplicar dos números: multiplicar = lambda a, b: a * b. Imprime multiplicar(4, 5).",
        expected: "20",
        starter: "",
        solution: "multiplicar = lambda a, b: a * b\nprint(multiplicar(4, 5))",
        explanation: "Las funciones lambda son funciones anónimas inline que toman argumentos y devuelven el resultado de una expresión única."
      },
      {
        q: "Desafío Avanzado 8: Crea una clase Rectangulo con atributos ancho=4 y alto=5, y un método area() que calcule su producto. Imprime r.area().",
        expected: "20",
        starter: "",
        solution: "class Rectangulo:\n    def __init__(self, ancho, alto):\n        self.ancho = ancho\n        self.alto = alto\n    def area(self):\n        return self.ancho * self.alto\nr = Rectangulo(4, 5)\nprint(r.area())",
        explanation: "El constructor recibe los parámetros de dimensiones y el método area() calcula la superficie geométrica."
      },
      {
        q: "Desafío Avanzado 9 (Excepciones): Con un bloque try/except, divide 10 entre 0 y en el bloque ZeroDivisionError imprime 'Error: Division por cero'.",
        expected: "Error: Division por cero",
        starter: "",
        solution: "try:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    print('Error: Division por cero')",
        explanation: "El manejo de excepciones con try/except captura errores en tiempo de ejecución sin detener abruptamente el programa."
      },
      {
        q: "Desafío Avanzado 10: Crea una función recursiva factorial(n). Calcula e imprime factorial(4) (4 * 3 * 2 * 1).",
        expected: "24",
        starter: "",
        solution: "def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(4))",
        explanation: "La recursividad divide el problema llamándose a sí misma con un caso base n <= 1: 4 * 3 * 2 * 1 = 24."
      },
      {
        q: "Desafío Avanzado 11: Usa filter() o una comprensión de listas para obtener los pares de [1, 2, 3, 4, 5, 6] e imprime la lista.",
        expected: "[2, 4, 6]",
        starter: "",
        solution: "pares = [x for x in [1, 2, 3, 4, 5, 6] if x % 2 == 0]\nprint(pares)",
        explanation: "La condición 'if x % 2 == 0' filtra únicamente los números cuyo residuo al dividir entre 2 sea cero."
      },
      {
        q: "Desafío Avanzado 12 (Método estático): Crea una clase Calculadora con un método estático estatico sumar(a, b) que retorne a + b. Imprime Calculadora.sumar(7, 3).",
        expected: "10",
        starter: "",
        solution: "class Calculadora:\n    @staticmethod\n    def sumar(a, b):\n        return a + b\nprint(Calculadora.sumar(7, 3))",
        explanation: "El decorador @staticmethod permite definir métodos que no reciben 'self' y pueden ser invocados directamente desde la clase."
      }
    ]
  }
};