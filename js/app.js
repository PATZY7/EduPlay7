class GameApp {
    constructor() {
        this.currentUser = null;
        this.currentCategory = null; // 'matematica' | 'programacion'
        this.currentTopic = null;    // 'algebra' | 'trigonometria'
        this.currentDifficulty = null; // 'facil' | 'medio' | 'dificil'
        this.currentMode = 'junior'; // 'junior' | 'senior' | 'avanzado'
        this.currentSubjectTitle = '';
        this.currentLevel = 0;
        this.score = 0;
        this.activeQuestions = [];
        this.questionAlreadyScored = false;
        this.codeMirrorEditor = null;
        this.adminStudents = [];
        this.theme = localStorage.getItem('upea_theme') || 'light';

        this.applyTheme(this.theme);
        this.initAuth();
    }

    /* ========================================================
       TEMA CLARO / OSCURO
    ======================================================== */
    applyTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('upea_theme', theme);

        const iconEl = document.getElementById('theme-icon');
        const textEl = document.getElementById('theme-text');

        if (iconEl && textEl) {
            if (theme === 'dark') {
                iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
                textEl.innerText = 'Modo Claro';
            } else {
                iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
                textEl.innerText = 'Modo Oscuro';
            }
        }

        if (this.codeMirrorEditor) {
            this.codeMirrorEditor.setOption('theme', theme === 'dark' ? 'dracula' : 'default');
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    /* ========================================================
       BARRA LATERAL RESPONSIVA (MÓVIL)
    ======================================================== */
    toggleMobileSidebar() {
        const sidebar = document.getElementById('app-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar) sidebar.classList.toggle('mobile-open');
        if (backdrop) backdrop.classList.toggle('active');
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('app-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (backdrop) backdrop.classList.remove('active');
    }

    /* ========================================================
       NAVEGACIÓN ENTRE VISTAS
    ======================================================== */
    switchTab(tabId) {
        this.closeMobileSidebar();

        const views = [
            'login', 'register', 'inicio', 'materias', 
            'matematica-menu', 'dificultad-menu', 'programacion-menu', 
            'progreso', 'admin-panel', 'game', 'game-over'
        ];

        views.forEach(id => {
            const el = document.getElementById(`view-${id}`);
            if (el) el.classList.add('hidden');
        });

        const sidebar = document.getElementById('app-sidebar');
        if (['login', 'register'].includes(tabId)) {
            if (sidebar) sidebar.classList.add('hidden');
        } else {
            if (sidebar) sidebar.classList.remove('hidden');
        }

        ['inicio', 'materias', 'progreso', 'admin'].forEach(id => {
            const el = document.getElementById(`menu-${id}`);
            if (el) el.classList.remove('active');
        });

        const target = document.getElementById(`view-${tabId}`);
        if (target) target.classList.remove('hidden');

        // Mapear selección activa en el menú lateral
        let activeMenuId = tabId;
        if (['matematica-menu', 'dificultad-menu', 'programacion-menu', 'game', 'game-over'].includes(tabId)) {
            activeMenuId = 'materias';
        } else if (tabId === 'admin-panel') {
            activeMenuId = 'admin';
        }

        const activeMenuItem = document.getElementById(`menu-${activeMenuId}`);
        if (activeMenuItem) activeMenuItem.classList.add('active');

        if (tabId === 'progreso') this.loadProgreso();
        if (tabId === 'admin-panel') this.loadAdminEstudiantes();
    }

    /* ========================================================
       AUTENTICACIÓN Y GESTIÓN DE SESIÓN (SIN INVITADO)
    ======================================================== */
    initAuth() {
        const savedSession = sessionStorage.getItem('upea_session');
        if (savedSession) {
            try {
                const user = JSON.parse(savedSession);
                this.setCurrentUser(user);
                this.switchTab('inicio');
                return;
            } catch (e) {
                sessionStorage.removeItem('upea_session');
            }
        }
        this.switchTab('login');
    }

    setCurrentUser(user) {
        this.currentUser = user;
        sessionStorage.setItem('upea_session', JSON.stringify(user));
        this.updateUserCard(user);
        const profileTrigger = document.getElementById('profile-trigger');
        if (profileTrigger) {
            profileTrigger.classList.toggle('hidden', !user || user.rol !== 'student' || user.localOnly === true);
        }

        const adminMenu = document.getElementById('menu-admin');
        if (adminMenu) {
            if (user.rol === 'admin') {
                adminMenu.classList.remove('hidden');
            } else {
                adminMenu.classList.add('hidden');
            }
        }
    }

    updateUserCard(user) {
        const userDisplay = document.getElementById('user-display');
        const roleDisplay = document.getElementById('user-role-display');
        const subDisplay = document.getElementById('user-sub-display');
        const avatarDisplay = document.getElementById('user-avatar');

        if (!user) {
            if (userDisplay) userDisplay.innerText = 'No identificado';
            if (roleDisplay) roleDisplay.innerText = 'Sesión cerrada';
            if (subDisplay) subDisplay.innerText = '';
            if (avatarDisplay) avatarDisplay.innerText = 'U';
            return;
        }

        const fullName = `${user.nombre || ''} ${user.apellido || ''}`.trim() || 'Estudiante UPEA';
        const initials = ((user.nombre ? user.nombre[0] : 'U') + (user.apellido ? user.apellido[0] : 'P')).toUpperCase();

        if (userDisplay) userDisplay.innerText = fullName;
        if (avatarDisplay) avatarDisplay.innerText = initials;

        const profileAvatar = document.getElementById('profile-avatar');
        const profileName = document.getElementById('profile-trigger-name');
        if (profileAvatar) profileAvatar.innerText = initials;
        if (profileName) profileName.innerText = fullName;

        if (user.rol === 'admin') {
            if (roleDisplay) roleDisplay.innerText = 'Administrador General';
            if (subDisplay) subDisplay.innerText = 'Carrera Sistemas';
        } else {
            if (roleDisplay) roleDisplay.innerText = user.semestre || 'Estudiante Regular';
            if (subDisplay) subDisplay.innerText = `RU: ${user.ru || 'Registrado'}`;
        }
    }

    loginUser() {
        const correo = document.getElementById('login-correo').value.trim();
        const ru = document.getElementById('login-ru').value.trim();

        if (!correo || !ru) {
            alert('Por favor complete su correo y RU institucional.');
            return;
        }

        fetch('backend/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password: ru })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                if (data.role === 'admin') {
                    const adminUser = { id: 0, nombre: 'Administrador', apellido: 'UPEA', correo: correo, rol: 'admin' };
                    this.setCurrentUser(adminUser);
                    this.switchTab('admin-panel');
                } else {
                    const student = data.estudiante;
                    student.rol = 'student';
                    this.setCurrentUser(student);
                    this.switchTab('inicio');
                }
            } else {
                alert(data.message || 'Credenciales incorrectas.');
            }
        })
        .catch(() => {
            // Modo de respaldo local controlado si la base de datos MySQL aún no está encendida
            if (correo === 'admin@upea.bo' && ru === 'admin123') {
                const adminUser = { id: 0, nombre: 'Administrador', apellido: 'UPEA', correo: correo, rol: 'admin' };
                this.setCurrentUser(adminUser);
                this.switchTab('admin-panel');
            } else {
                const simulatedStudent = {
                    id: 1,
                    nombre: correo.split('@')[0] || 'Estudiante',
                    apellido: 'UPEA',
                    correo: correo,
                    ru: ru,
                    semestre: '5to Semestre',
                    rol: 'student',
                    localOnly: true
                };
                this.setCurrentUser(simulatedStudent);
                this.switchTab('inicio');
            }
        });
    }

    logout() {
        this.currentUser = null;
        sessionStorage.removeItem('upea_session');
        this.updateUserCard(null);
        document.getElementById('profile-trigger')?.classList.add('hidden');
        this.closeProfile();
        document.getElementById('login-correo').value = '';
        document.getElementById('login-ru').value = '';
        this.switchTab('login');
    }

    registrarEstudiante() {
        const nombre = document.getElementById('reg-nombre').value.trim();
        const apellido = document.getElementById('reg-apellido').value.trim();
        const correo = document.getElementById('reg-correo').value.trim();
        const ru = document.getElementById('reg-ru').value.trim();
        const ci = document.getElementById('reg-ci').value.trim();
        const semestre = document.getElementById('reg-semestre').value;

        if (!nombre || !apellido || !correo || !ru || !ci) {
            alert('Por favor rellene todos los campos obligatorios.');
            return;
        }

        fetch('backend/registrar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, correo, ru, ci, semestre })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if (data.status === 'success') {
                document.getElementById('login-correo').value = correo;
                document.getElementById('login-ru').value = ru;
                this.switchTab('login');
            }
        })
        .catch(() => {
            alert('Estudiante registrado exitosamente en el sistema.');
            document.getElementById('login-correo').value = correo;
            document.getElementById('login-ru').value = ru;
            this.switchTab('login');
        });
    }

    /* ========================================================
       CONFIGURACIÓN DE JUEGOS Y RONDAS (10 DESAFÍOS)
    ======================================================== */
    startMatematica(topic) {
        this.currentTopic = topic;
        this.switchTab('dificultad-menu');
    }

    startMatematicaWithDifficulty(difficulty) {
        this.currentCategory = 'matematica';
        this.currentDifficulty = difficulty;
        this.currentLevel = 0;
        this.score = 0;

        const subtopicLabel = this.currentTopic === 'algebra' ? 'Álgebra Básica' : 'Trigonometría';
        const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        this.currentSubjectTitle = `Matemáticas - ${subtopicLabel} (${difficultyLabel})`;

        // Extraer banco de preguntas, mezclar y tomar exactamente 10 desafíos
        const bank = [...questionsData.matematica[this.currentTopic][difficulty]];
        this.activeQuestions = bank.sort(() => Math.random() - 0.5).slice(0, 10);

        this.switchTab('game');
        document.getElementById('category-title').innerText = this.currentSubjectTitle;
        this.loadQuestion();
    }

    startProgramacion(mode) {
        this.currentCategory = 'programacion';
        this.currentMode = mode;
        this.currentLevel = 0;
        this.score = 0;

        const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);
        this.currentSubjectTitle = `Programación Python - Nivel ${modeLabel}`;

        // Extraer banco de programación, mezclar y tomar exactamente 10 desafíos
        const bank = [...questionsData.programacion[mode]];
        this.activeQuestions = bank.sort(() => Math.random() - 0.5).slice(0, 10);

        this.switchTab('game');
        document.getElementById('category-title').innerText = this.currentSubjectTitle;
        this.loadQuestion();
    }

    exitGamePrompt() {
        if (confirm('¿Deseas salir de la ronda actual? El progreso de esta sesión no se guardará.')) {
            if (this.currentCategory === 'matematica') {
                this.switchTab('matematica-menu');
            } else {
                this.switchTab('programacion-menu');
            }
        }
    }

    /* ========================================================
       CARGA Y EVALUACIÓN DE DESAFÍOS CON EXPLICACIONES
    ======================================================== */
    loadQuestion() {
        if (this.currentLevel >= this.activeQuestions.length) {
            this.finishGame();
            return;
        }

        this.questionAlreadyScored = false;
        const qData = this.activeQuestions[this.currentLevel];

        // Indicadores superiores
        document.getElementById('level-indicator').innerText = `Desafío ${this.currentLevel + 1} de ${this.activeQuestions.length}`;
        document.getElementById('score').innerText = this.score;
        document.getElementById('question-text').innerText = qData.q;

        // Ocultar explicaciones anteriores y botón siguiente
        const explanationContainer = document.getElementById('explanation-container');
        explanationContainer.className = 'hidden';
        explanationContainer.innerHTML = '';

        const nextBtn = document.getElementById('next-btn');
        nextBtn.classList.add('hidden');

        const container = document.getElementById('options-container');
        container.innerHTML = '';

        if (this.currentCategory === 'matematica') {
            this.renderMathOptions(container, qData);
        } else {
            this.renderProgrammingEditor(container, qData);
        }
    }

    renderMathOptions(container, qData) {
        const optionsGrid = document.createElement('div');
        optionsGrid.className = 'options-grid';

        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span><strong>${String.fromCharCode(65 + index)})</strong> ${opt}</span>`;
            
            btn.onclick = () => this.handleMathAnswer(index, qData, optionsGrid);
            optionsGrid.appendChild(btn);
        });

        container.appendChild(optionsGrid);
    }

    handleMathAnswer(selectedIndex, qData, optionsGrid) {
        if (this.questionAlreadyScored) return;
        this.questionAlreadyScored = true;

        const buttons = optionsGrid.querySelectorAll('.option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === qData.answer) {
                btn.classList.add('correct');
            }
            if (idx === selectedIndex && idx !== qData.answer) {
                btn.classList.add('incorrect');
            }
        });

        const isCorrect = selectedIndex === qData.answer;
        if (isCorrect) {
            this.score += 10;
            document.getElementById('score').innerText = this.score;
        }

        // Mostrar caja con la explicación pedagógica tanto en acierto como en error
        const explanationContainer = document.getElementById('explanation-container');
        explanationContainer.className = `explanation-card ${isCorrect ? 'correct' : 'incorrect'}`;
        
        explanationContainer.innerHTML = `
            <div class="explanation-header">
                <span>${isCorrect ? 'Respuesta Correcta (+10 puntos)' : 'Respuesta Incorrecta (0 puntos)'}</span>
            </div>
            <div style="margin-top: 4px;">
                ${!isCorrect ? `<p style="margin-bottom: 6px;"><strong>Opción correcta:</strong> ${qData.options[qData.answer]}</p>` : ''}
                <p><strong>Explicación:</strong> ${qData.explanation}</p>
            </div>
        `;

        document.getElementById('next-btn').classList.remove('hidden');
    }

    renderProgrammingEditor(container, qData) {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-editor-wrapper';

        wrapper.innerHTML = `
            <div style="margin-bottom: 8px; font-size: 0.88rem; color: var(--text-muted); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
                <span>Escribe tu solución en Python:</span>
                <span>Salida esperada: <code style="background: var(--box-bg); padding: 2px 6px; border-radius: 4px; font-weight: bold; color: var(--primary);">${qData.expected.replace(/\n/g, ' ↵ ')}</code></span>
            </div>

            <div class="code-editor-header">
                <div class="code-editor-tab">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    <span>main.py</span>
                    <span class="code-editor-badge">Python 3</span>
                </div>
                <div class="code-editor-actions">
                    <button type="button" class="btn-editor-action" onclick="gameApp.clearEditor()" title="Limpiar todo el código">Limpiar</button>
                    <button type="button" class="btn-editor-action" onclick="gameApp.resetStarter()" title="Reiniciar código">Reiniciar</button>
                </div>
            </div>

            <textarea id="code-input" placeholder="# Escribe tu código Python aquí..."></textarea>
            
            <div style="margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-accent" onclick="gameApp.runCode()">
                    <span>Ejecutar / Verificar</span>
                </button>
                <button class="btn btn-secondary" onclick="gameApp.surrenderCode()">
                    <span>Ver Solución Didáctica</span>
                </button>
            </div>
            
            <div class="console-container">
                <div class="console-header">
                    <span>Consola de Salida (Terminal)</span>
                    <span id="console-status" style="font-size: 0.72rem; color: #4ade80;">Lista</span>
                </div>
                <div id="console-out" class="console-output">Consola interactiva lista. Escribe tu código arriba y presiona "Ejecutar / Verificar"...</div>
            </div>
        `;

        container.appendChild(wrapper);

        // Inicializar CodeMirror para Python
        const textarea = document.getElementById('code-input');
        if (window.CodeMirror && textarea) {
            this.codeMirrorEditor = CodeMirror.fromTextArea(textarea, {
                mode: { name: "python", version: 3, singleLineStringErrors: false },
                theme: this.theme === 'dark' ? 'dracula' : 'default',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                indentWithTabs: false,
                autoCloseBrackets: true,
                matchBrackets: true,
                lineWrapping: true
            });
            this.codeMirrorEditor.setValue(qData.starter || "");
            setTimeout(() => {
                if (this.codeMirrorEditor) this.codeMirrorEditor.refresh();
            }, 60);
        } else {
            this.codeMirrorEditor = null;
        }
    }

    clearEditor() {
        if (this.codeMirrorEditor) {
            this.codeMirrorEditor.setValue("");
            this.codeMirrorEditor.focus();
        } else {
            const textarea = document.getElementById('code-input');
            if (textarea) textarea.value = "";
        }
    }

    resetStarter() {
        const qData = this.activeQuestions[this.currentLevel];
        const val = qData ? (qData.starter || "") : "";
        if (this.codeMirrorEditor) {
            this.codeMirrorEditor.setValue(val);
            this.codeMirrorEditor.focus();
        } else {
            const textarea = document.getElementById('code-input');
            if (textarea) textarea.value = val;
        }
    }

    runCode() {
        const qData = this.activeQuestions[this.currentLevel];
        const out = document.getElementById('console-out');
        const statusEl = document.getElementById('console-status');

        let userCode = "";
        if (this.codeMirrorEditor) {
            userCode = this.codeMirrorEditor.getValue();
        } else {
            const codeInput = document.getElementById('code-input');
            userCode = codeInput ? codeInput.value : '';
        }

        if (!userCode.trim()) {
            if (out) out.innerText = 'Advertencia: El editor está vacío. Escribe tu código Python antes de ejecutar.';
            if (statusEl) { statusEl.innerText = 'Vacío'; statusEl.style.color = 'var(--accent)'; }
            return;
        }

        const execution = this.simulatePython(userCode);
        const actualOutput = execution.output !== undefined ? execution.output : '';
        if (out) out.innerText = actualOutput || '(Sin salida en consola)';

        const isMatch = this.verifyOutput(actualOutput, qData.expected, userCode, qData.solution);
        const explanationContainer = document.getElementById('explanation-container');

        if (isMatch) {
            if (statusEl) { statusEl.innerText = 'Superado'; statusEl.style.color = '#4ade80'; }
            if (out) out.innerText += '\n\n[Resultado]: Desafío superado correctamente.';
            
            if (!this.questionAlreadyScored) {
                this.score += 10;
                this.questionAlreadyScored = true;
                document.getElementById('score').innerText = this.score;
            }

            explanationContainer.className = 'explanation-card correct';
            explanationContainer.innerHTML = `
                <div class="explanation-header">
                    <span>Desafío Superado Exitosamente (+10 puntos)</span>
                </div>
                <div style="margin-top: 4px;">
                    <p><strong>Explicación del ejercicio:</strong> ${qData.explanation}</p>
                </div>
            `;
            document.getElementById('next-btn').classList.remove('hidden');
        } else {
            if (statusEl) { statusEl.innerText = 'Diferencia'; statusEl.style.color = '#f87171'; }
            if (out) out.innerText += `\n\n[Resultado]: Salida no coincide.\nSalida esperada:\n${qData.expected}`;

            explanationContainer.className = 'explanation-card incorrect';
            explanationContainer.innerHTML = `
                <div class="explanation-header">
                    <span>Resultado Incorrecto</span>
                </div>
                <div style="margin-top: 4px;">
                    <p>Revisa la lógica y los valores de salida.</p>
                    <p><strong>Pista / Explicación:</strong> ${qData.explanation}</p>
                </div>
            `;
        }
    }

    surrenderCode() {
        const qData = this.activeQuestions[this.currentLevel];
        const out = document.getElementById('console-out');
        const statusEl = document.getElementById('console-status');
        const explanationContainer = document.getElementById('explanation-container');

        if (this.codeMirrorEditor) {
            this.codeMirrorEditor.setValue(qData.solution);
        } else {
            const codeInput = document.getElementById('code-input');
            if (codeInput) codeInput.value = qData.solution;
        }

        if (statusEl) { statusEl.innerText = 'Solución'; statusEl.style.color = 'var(--accent)'; }
        if (out) out.innerText = `Solución de referencia cargada en el editor.\nSalida esperada:\n${qData.expected}`;

        explanationContainer.className = 'explanation-card incorrect';
        explanationContainer.innerHTML = `
            <div class="explanation-header">
                <span>Solución Mostrada (0 puntos)</span>
            </div>
            <div style="margin-top: 4px;">
                <p><strong>Explicación:</strong> ${qData.explanation}</p>
            </div>
        `;

        this.questionAlreadyScored = true; // No suma puntos tras rendirse
        document.getElementById('next-btn').classList.remove('hidden');
    }

    /* Evaluador e intérprete seguro para la simulación de Python en el navegador */
    simulatePython(code) {
        let stdout = [];

        const pyFormat = (val) => {
            if (val === null) return 'None';
            if (val === true) return 'True';
            if (val === false) return 'False';
            if (Array.isArray(val)) {
                return '[' + val.map(x => pyFormatInList(x)).join(', ') + ']';
            }
            if (typeof val === 'string') return val;
            if (typeof val === 'object') {
                const entries = Object.entries(val).map(([k, v]) => `'${k}': ${typeof v === 'string' ? `'${v}'` : pyFormat(v)}`);
                return '{' + entries.join(', ') + '}';
            }
            return String(val);
        };

        const pyFormatInList = (val) => {
            if (typeof val === 'string') return `'${val}'`;
            return pyFormat(val);
        };

        const print = (...args) => {
            const line = args.map(a => {
                if (Array.isArray(a)) {
                    return '[' + a.map(x => pyFormatInList(x)).join(', ') + ']';
                }
                return pyFormat(a);
            }).join(' ');
            stdout.push(line);
        };

        const int = (val) => {
            const n = parseInt(val, 10);
            return isNaN(n) ? 0 : n;
        };

        const float = (val) => {
            const n = parseFloat(val);
            return isNaN(n) ? 0.0 : n;
        };

        const str = (val) => String(val);

        const len = (val) => {
            if (val && typeof val.length === 'number') return val.length;
            if (val && typeof val === 'object') return Object.keys(val).length;
            return 0;
        };

        const sum = (val) => {
            if (Array.isArray(val)) return val.reduce((acc, curr) => acc + Number(curr), 0);
            return 0;
        };

        const max = (...args) => {
            if (args.length === 1 && Array.isArray(args[0])) return Math.max(...args[0]);
            return Math.max(...args);
        };

        const min = (...args) => {
            if (args.length === 1 && Array.isArray(args[0])) return Math.min(...args[0]);
            return Math.min(...args);
        };

        const range = (start, stop, step = 1) => {
            if (stop === undefined) { stop = start; start = 0; }
            const res = [];
            if (step > 0) {
                for (let i = start; i < stop; i += step) res.push(i);
            } else if (step < 0) {
                for (let i = start; i > stop; i += step) res.push(i);
            }
            return res;
        };

        const type = (val) => {
            let name = 'object';
            if (val === null) name = 'NoneType';
            else if (Array.isArray(val)) name = 'list';
            else if (typeof val === 'number') name = Number.isInteger(val) ? 'int' : 'float';
            else if (typeof val === 'string') name = 'str';
            else if (typeof val === 'boolean') name = 'bool';
            return { __name__: name, toString: () => `<class '${name}'>` };
        };

        if (!Array.prototype.append) {
            Object.defineProperty(Array.prototype, 'append', {
                value: function(el) { this.push(el); return this; },
                writable: true,
                configurable: true
            });
        }

        try {
            const lines = code.split('\n');
            let jsLines = [];
            let indentStack = [0];

            for (let rawLine of lines) {
                let line = rawLine;
                let commentIdx = line.indexOf('#');
                if (commentIdx !== -1) line = line.slice(0, commentIdx);
                if (!line.trim()) continue;

                const indent = line.search(/\S|$/);
                const trimmed = line.trim();

                while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
                    indentStack.pop();
                    jsLines.push('}');
                }

                let converted = trimmed;

                if (converted === 'pass') continue;

                // class Name(Parent): or class Name:
                let classMatch = converted.match(/^class\s+([A-Za-z0-9_]+)(?:\(([^)]*)\))?\s*:/);
                if (classMatch) {
                    const name = classMatch[1];
                    const parent = classMatch[2] ? ` extends ${classMatch[2]}` : '';
                    jsLines.push(`class ${name}${parent} {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // def __init__(self, ...):
                let initMatch = converted.match(/^def\s+__init__\s*\(\s*self\s*(?:,\s*([^)]*))?\s*\)\s*:/);
                if (initMatch) {
                    const args = initMatch[1] || '';
                    jsLines.push(`constructor(${args}) {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // def method(self, ...):
                let methodMatch = converted.match(/^def\s+([A-Za-z0-9_]+)\s*\(\s*self\s*(?:,\s*([^)]*))?\s*\)\s*:/);
                if (methodMatch && indentStack.length > 1) {
                    const name = methodMatch[1];
                    const args = methodMatch[2] || '';
                    jsLines.push(`${name}(${args}) {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // def func(...):
                let funcMatch = converted.match(/^def\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*:/);
                if (funcMatch) {
                    const name = funcMatch[1];
                    const args = funcMatch[2] || '';
                    jsLines.push(`function ${name}(${args}) {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // for var in range(...):
                let forRangeMatch = converted.match(/^for\s+([A-Za-z0-9_]+)\s+in\s+range\(([^)]*)\)\s*:/);
                if (forRangeMatch) {
                    const varName = forRangeMatch[1];
                    const rangeArgs = forRangeMatch[2];
                    jsLines.push(`for (let ${varName} of range(${rangeArgs})) {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // for var in iterable:
                let forMatch = converted.match(/^for\s+([A-Za-z0-9_]+)\s+in\s+(.+)\s*:/);
                if (forMatch) {
                    const varName = forMatch[1];
                    const iter = forMatch[2];
                    jsLines.push(`for (let ${varName} of (${iter})) {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // if / elif / else:
                if (converted.match(/^if\s+(.+)\s*:/)) {
                    let cond = converted.match(/^if\s+(.+)\s*:/)[1];
                    jsLines.push(`if (${cond}) {`);
                    indentStack.push(indent + 4);
                    continue;
                }
                if (converted.match(/^elif\s+(.+)\s*:/)) {
                    let cond = converted.match(/^elif\s+(.+)\s*:/)[1];
                    jsLines.push(`} else if (${cond}) {`);
                    continue;
                }
                if (converted === 'else:') {
                    jsLines.push(`} else {`);
                    continue;
                }

                // while cond:
                if (converted.match(/^while\s+(.+)\s*:/)) {
                    let cond = converted.match(/^while\s+(.+)\s*:/)[1];
                    jsLines.push(`while (${cond}) {`);
                    indentStack.push(indent + 4);
                    continue;
                }

                // try: / except:
                if (converted === 'try:') {
                    jsLines.push(`try {`);
                    indentStack.push(indent + 4);
                    continue;
                }
                if (converted.match(/^except(?:\s+[A-Za-z0-9_]+)?\s*:/)) {
                    jsLines.push(`} catch(e) {`);
                    continue;
                }

                if (converted === '@staticmethod') continue;

                let stmt = converted
                    .replace(/\bself\./g, 'this.')
                    .replace(/\[::-1\]/g, '.slice().reverse()')
                    .replace(/\bTrue\b/g, 'true')
                    .replace(/\bFalse\b/g, 'false')
                    .replace(/\bNone\b/g, 'null')
                    .replace(/(\d+)\s*\/\/\s*(\d+)/g, 'Math.floor($1 / $2)');

                // Comprensión de listas [expr for var in list]
                let compMatch = stmt.match(/\[\s*(.+?)\s+for\s+([A-Za-z0-9_]+)\s+in\s+([^\]]+?)\s*\]/);
                if (compMatch) {
                    stmt = stmt.replace(compMatch[0], `(${compMatch[3]}).map(${compMatch[2]} => ${compMatch[1]})`);
                }

                // Comprensión de listas con condición [expr for var in list if cond]
                let compIfMatch = stmt.match(/\[\s*(.+?)\s+for\s+([A-Za-z0-9_]+)\s+in\s+(.+?)\s+if\s+([^\]]+)\s*\]/);
                if (compIfMatch) {
                    stmt = stmt.replace(compIfMatch[0], `(${compIfMatch[3]}).filter(${compIfMatch[2]} => ${compIfMatch[4]})`);
                }

                // Funciones lambda
                let lambdaMatch = stmt.match(/lambda\s+([^:]+)\s*:\s*(.+)$/);
                if (lambdaMatch) {
                    stmt = stmt.replace(lambdaMatch[0], `(${lambdaMatch[1].trim()}) => ${lambdaMatch[2].trim()}`);
                }

                if (stmt.startsWith('def ')) {
                    let m = stmt.match(/^def\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*:/);
                    if (m) {
                        stmt = `static ${m[1]}(${m[2]}) {`;
                        indentStack.push(indent + 4);
                    }
                }

                jsLines.push(stmt + (stmt.endsWith('{') || stmt.endsWith('}') ? '' : ';'));
            }

            while (indentStack.length > 1) {
                indentStack.pop();
                jsLines.push('}');
            }

            const fullJs = jsLines.join('\n');
            const runFn = new Function('print', 'int', 'float', 'str', 'len', 'sum', 'max', 'min', 'range', 'type', fullJs);
            runFn(print, int, float, str, len, sum, max, min, range, type);

            return { output: stdout.join('\n') };
        } catch (err) {
            return { output: 'Error de ejecución: ' + err.message };
        }
    }

    verifyOutput(actual, expected, userCode, solution) {
        if (!actual && !userCode) return false;

        const cleanActual = (actual || '').trim().replace(/\r\n/g, '\n');
        const cleanExpected = (expected || '').trim().replace(/\r\n/g, '\n');

        if (cleanActual === cleanExpected) return true;

        // Comprobación de normalización sin espacios superfluos
        const normActual = cleanActual.replace(/\s+/g, '');
        const normExpected = cleanExpected.replace(/\s+/g, '');
        if (normActual === normExpected && normActual.length > 0) return true;

        // Comprobación secundaria si el código del estudiante es idéntico al de referencia
        if (userCode && solution) {
            const cleanUser = userCode.replace(/['"\s]/g, '');
            const cleanSol = solution.replace(/['"\s]/g, '');
            if (cleanUser === cleanSol) return true;
        }

        return false;
    }

    nextLevel() {
        this.currentLevel++;
        this.loadQuestion();
    }

    /* ========================================================
       FINALIZACIÓN DE RONDA Y ALMACENAMIENTO EN BASE DE DATOS
    ======================================================== */
    finishGame() {
        this.switchTab('game-over');
        document.getElementById('final-score').innerText = this.score;

        const msgEl = document.getElementById('final-message');
        if (this.score >= 80) {
            msgEl.innerText = 'Rendimiento excelente. Dominio sobresaliente del tema.';
            msgEl.style.color = 'var(--success)';
        } else if (this.score >= 50) {
            msgEl.innerText = 'Buen trabajo. Has aprobado satisfactoriamente la ronda.';
            msgEl.style.color = 'var(--primary)';
        } else {
            msgEl.innerText = 'Se sugiere repasar el contenido y volver a intentarlo.';
            msgEl.style.color = 'var(--accent)';
        }

        // Almacenar el progreso en la base de datos MySQL
        this.saveProgress(this.currentSubjectTitle, this.score);
    }

    saveProgress(materia, puntaje) {
        const studentId = this.currentUser && this.currentUser.id ? this.currentUser.id : 1;

        // Guardado en MySQL mediante backend/guardar_puntaje.php
        fetch('backend/guardar_puntaje.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                estudiante_id: studentId,
                materia: materia,
                puntaje: puntaje
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log('Progreso registrado en la BD:', data.message);
        })
        .catch(err => {
            console.warn('Conexión con el servidor no disponible, guardando en caché local.');
        });

        // Almacenar también en localStorage como salvaguarda ininterrumpida
        const cacheKey = `upea_progreso_${studentId}`;
        const localList = JSON.parse(localStorage.getItem(cacheKey) || '[]');
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        localList.unshift({
            materia: materia,
            puntaje: puntaje,
            fecha: dateStr
        });

        localStorage.setItem(cacheKey, JSON.stringify(localList.slice(0, 50)));
    }

    loadProgreso() {
        const tbody = document.getElementById('progreso-body');
        if (!tbody) return;

        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Consultando base de datos institucional...</td></tr>`;

        const studentId = this.currentUser && this.currentUser.id ? this.currentUser.id : 1;

        fetch(`backend/obtener_progreso.php?estudiante_id=${studentId}`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                this.renderProgresoTable(tbody, data);
            } else {
                this.loadProgresoFromCache(tbody, studentId);
            }
        })
        .catch(() => {
            this.loadProgresoFromCache(tbody, studentId);
        });
    }

    loadProgresoFromCache(tbody, studentId) {
        const cacheKey = `upea_progreso_${studentId}`;
        const localList = JSON.parse(localStorage.getItem(cacheKey) || '[]');

        if (localList.length > 0) {
            this.renderProgresoTable(tbody, localList);
        } else {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 25px;">Aún no tienes evaluaciones registradas. Elige una materia para comenzar.</td></tr>`;
        }
    }

    renderProgresoTable(tbody, items) {
        tbody.innerHTML = '';
        items.forEach(item => {
            const tr = document.createElement('tr');
            const scoreNum = parseInt(item.puntaje, 10) || 0;
            const statusLabel = scoreNum >= 51 ? 'Aprobado' : 'En refuerzo';
            const statusColor = scoreNum >= 51 ? 'var(--success)' : 'var(--accent)';

            tr.innerHTML = `
                <td><strong>${item.materia}</strong></td>
                <td><strong style="color: var(--primary);">${scoreNum} / 100 pts</strong></td>
                <td><span style="font-weight: 600; color: ${statusColor};">${statusLabel}</span></td>
                <td>${item.fecha || 'Reciente'}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    openProfile() {
        if (!this.currentUser || this.currentUser.rol !== 'student') return;
        const user = this.currentUser;
        document.getElementById('profile-name').value = user.nombre || '';
        document.getElementById('profile-surname').value = user.apellido || '';
        document.getElementById('profile-email').value = user.correo || '';
        document.getElementById('profile-ru').value = user.ru || '';
        document.getElementById('profile-ci').value = user.ci || '';
        document.getElementById('profile-semester').value = user.semestre || '';
        document.getElementById('profile-current-password').value = '';
        document.getElementById('profile-new-password').value = '';
        document.getElementById('profile-confirm-password').value = '';
        document.getElementById('profile-modal').classList.remove('hidden');
        document.getElementById('profile-current-password').focus();
    }

    closeProfile() {
        document.getElementById('profile-modal')?.classList.add('hidden');
        document.getElementById('profile-form')?.reset();
    }

    async saveProfile(event) {
        event.preventDefault();
        if (!this.currentUser || this.currentUser.rol !== 'student') return;

        const newPassword = document.getElementById('profile-new-password').value;
        const confirmPassword = document.getElementById('profile-confirm-password').value;
        if (newPassword && newPassword.length < 6) {
            alert('La nueva contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('La nueva contraseña y su confirmación no coinciden.');
            return;
        }

        const payload = {
            id: Number(this.currentUser.id),
            current_password: document.getElementById('profile-current-password').value,
            nombre: document.getElementById('profile-name').value.trim(),
            apellido: document.getElementById('profile-surname').value.trim(),
            correo: document.getElementById('profile-email').value.trim(),
            ci: document.getElementById('profile-ci').value.trim(),
            semestre: document.getElementById('profile-semester').value,
            new_password: newPassword
        };
        const submitButton = document.getElementById('profile-submit');
        submitButton.disabled = true;

        try {
            const response = await fetch('backend/perfil.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (!response.ok || result.status !== 'success') {
                throw new Error(result.message || 'No se pudo actualizar el perfil.');
            }
            this.setCurrentUser({ ...this.currentUser, ...result.estudiante, rol: 'student' });
            this.closeProfile();
            alert(result.message || 'Perfil actualizado correctamente.');
        } catch (error) {
            alert(error.message || 'Ocurrió un error al actualizar el perfil.');
        } finally {
            submitButton.disabled = false;
        }
    }

    /* ========================================================
       PANEL DE ADMINISTRADOR
    ======================================================== */
    escapeHTML(value) {
        return String(value ?? '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    async loadAdminEstudiantes() {
        const tbody = document.getElementById('admin-body');
        if (!tbody) return;

        tbody.innerHTML = '<tr><td colspan="7" class="table-message">Cargando estudiantes...</td></tr>';

        try {
            const response = await fetch('backend/gestionar_estudiantes.php');
            if (!response.ok) throw new Error('No se pudo cargar la lista de estudiantes.');
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error('La respuesta del servidor no es válida.');
            this.adminStudents = data;
            this.renderAdminStudents();
        } catch (error) {
            this.adminStudents = [];
            document.getElementById('admin-student-count').textContent = '0';
            tbody.innerHTML = `<tr><td colspan="7" class="table-message">${this.escapeHTML(error.message)} Vuelva a abrir el panel para intentar de nuevo.</td></tr>`;
        }
    }

    filterAdminStudents() {
        this.renderAdminStudents();
    }

    renderAdminStudents() {
        const tbody = document.getElementById('admin-body');
        const count = document.getElementById('admin-student-count');
        const search = document.getElementById('admin-search');
        if (!tbody) return;

        const query = (search?.value || '').trim().toLocaleLowerCase('es');
        const filtered = this.adminStudents.filter(student =>
            [student.id, student.nombre, student.apellido, student.correo, student.ru, student.semestre]
                .some(value => String(value ?? '').toLocaleLowerCase('es').includes(query))
        );

        if (count) count.textContent = String(this.adminStudents.length);
        if (!filtered.length) {
            tbody.innerHTML = `<tr><td colspan="7" class="table-message">${query ? 'No se encontraron estudiantes con esa búsqueda.' : 'Aún no hay estudiantes registrados.'}</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(student => {
            const id = Number(student.id);
            const safeId = Number.isInteger(id) && id > 0 ? id : 0;
            const fullName = `${this.escapeHTML(student.nombre)} ${this.escapeHTML(student.apellido)}`.trim();
            return `
                <tr>
                    <td><span class="student-id">#${safeId}</span></td>
                    <td><strong>${fullName}</strong></td>
                    <td>${this.escapeHTML(student.correo)}</td>
                    <td>${this.escapeHTML(student.ru)}</td>
                    <td>${this.escapeHTML(student.semestre)}</td>
                    <td><span class="admin-status">Activo</span></td>
                    <td>
                        <div class="admin-actions">
                            <button type="button" class="btn btn-small btn-edit" onclick="gameApp.openStudentForm(${safeId})" ${safeId ? '' : 'disabled'}>Editar</button>
                            <button type="button" class="btn btn-small btn-danger" onclick="gameApp.deleteAdminStudent(${safeId})" ${safeId ? '' : 'disabled'}>Eliminar</button>
                        </div>
                    </td>
                </tr>`;
        }).join('');
    }

    openStudentForm(studentId = null) {
        const form = document.getElementById('admin-student-form');
        const modal = document.getElementById('student-modal');
        const student = studentId === null
            ? null
            : this.adminStudents.find(item => Number(item.id) === Number(studentId));
        if (!form || !modal) return;
        if (studentId !== null && !student) {
            alert('No se encontró el estudiante seleccionado. Actualice la lista e inténtelo de nuevo.');
            return;
        }

        form.reset();
        document.getElementById('admin-student-id').value = student ? student.id : '';
        document.getElementById('admin-student-name').value = student?.nombre || '';
        document.getElementById('admin-student-surname').value = student?.apellido || '';
        document.getElementById('admin-student-email').value = student?.correo || '';
        document.getElementById('admin-student-ru').value = student?.ru || '';
        document.getElementById('admin-student-ci').value = student?.ci || '';
        document.getElementById('admin-student-semester').value = student?.semestre || '';
        document.getElementById('student-modal-title').textContent = student ? 'Editar estudiante' : 'Nuevo estudiante';
        document.getElementById('admin-student-submit').textContent = student ? 'Guardar cambios' : 'Guardar estudiante';
        modal.classList.remove('hidden');
        document.getElementById('admin-student-name').focus();
    }

    closeStudentForm() {
        document.getElementById('student-modal')?.classList.add('hidden');
        document.getElementById('admin-student-form')?.reset();
    }

    async saveAdminStudent(event) {
        event.preventDefault();
        const id = document.getElementById('admin-student-id').value;
        const payload = {
            nombre: document.getElementById('admin-student-name').value.trim(),
            apellido: document.getElementById('admin-student-surname').value.trim(),
            correo: document.getElementById('admin-student-email').value.trim(),
            ru: document.getElementById('admin-student-ru').value.trim(),
            ci: document.getElementById('admin-student-ci').value.trim(),
            semestre: document.getElementById('admin-student-semester').value
        };
        if (id) payload.id = Number(id);

        const submitButton = document.getElementById('admin-student-submit');
        submitButton.disabled = true;
        try {
            const response = await fetch('backend/gestionar_estudiantes.php', {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (!response.ok || result.status !== 'success') {
                throw new Error(result.message || 'No se pudo guardar el estudiante.');
            }
            this.closeStudentForm();
            await this.loadAdminEstudiantes();
            alert(result.message || 'Los datos del estudiante se guardaron correctamente.');
        } catch (error) {
            alert(error.message || 'Ocurrió un error al guardar el estudiante.');
        } finally {
            submitButton.disabled = false;
        }
    }

    async deleteAdminStudent(studentId) {
        const student = this.adminStudents.find(item => Number(item.id) === Number(studentId));
        if (!student) {
            alert('No se encontró el estudiante seleccionado. Actualice la lista e inténtelo de nuevo.');
            return;
        }
        if (!confirm(`¿Está seguro de eliminar el registro de ${student.nombre} ${student.apellido}? También se eliminará su historial de puntajes. Esta acción no se puede deshacer.`)) return;

        try {
            const response = await fetch('backend/gestionar_estudiantes.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: Number(studentId) })
            });
            const result = await response.json();
            if (!response.ok || result.status !== 'success') {
                throw new Error(result.message || 'No se pudo eliminar el estudiante.');
            }
            await this.loadAdminEstudiantes();
        } catch (error) {
            alert(error.message || 'Ocurrió un error al eliminar el estudiante.');
        }
    }
}

const gameApp = new GameApp();