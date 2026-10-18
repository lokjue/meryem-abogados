/**
 * ============================================================================
 * MERYEM ABOGADOS - ARQUITECTURA MULTIPÁGINA, MOTOR I18N (ES/AR RTL COMPLETO)
 * Dirección Letrada: Meryem Oulad
 * ============================================================================
 */

(function (window, document) {
  'use strict';

  const LANG_STORAGE_KEY = 'meryem_abogados_idioma';

  // Emblema SVG Oficial: Balanza de la Justicia enmarcada en Corona de Laurel Dorada
  function obtenerEmblemaSVG(clases = 'w-12 h-12') {
    return `
      <svg class="${clases}" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Emblema Meryem Abogados">
        <defs>
          <linearGradient id="goldGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF5C0"/>
            <stop offset="45%" stop-color="#D4AF37"/>
            <stop offset="80%" stop-color="#9A7409"/>
            <stop offset="100%" stop-color="#F5E18B"/>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="56" stroke="url(#goldGradLogo)" stroke-width="1.4" stroke-opacity="0.55"/>
        <circle cx="60" cy="60" r="50" stroke="url(#goldGradLogo)" stroke-width="0.8" stroke-dasharray="3 3" stroke-opacity="0.4"/>
        <path d="M56 102 C32 97, 18 78, 20 52 C21 36, 30 22, 44 15" stroke="url(#goldGradLogo)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <path d="M22 68 C16 63, 16 55, 23 53 M25 80 C18 76, 18 68, 25 66 M32 90 C25 88, 24 80, 31 77 M42 97 C35 96, 33 89, 40 86 M22 54 C17 48, 19 40, 26 40 M28 40 C24 34, 27 26, 34 28 M36 28 C34 22, 38 16, 44 19" stroke="url(#goldGradLogo)" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M64 102 C88 97, 102 78, 100 52 C99 36, 90 22, 76 15" stroke="url(#goldGradLogo)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        <path d="M98 68 C104 63, 104 55, 97 53 M95 80 C102 76, 102 68, 95 66 M88 90 C95 88, 96 80, 89 77 M78 97 C85 96, 87 89, 80 86 M98 54 C103 48, 101 40, 94 40 M92 40 C96 34, 93 26, 86 28 M84 28 C86 22, 82 16, 76 19" stroke="url(#goldGradLogo)" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M52 101 L60 106 L68 101" stroke="url(#goldGradLogo)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="60" y1="24" x2="60" y2="88" stroke="url(#goldGradLogo)" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="60" cy="22" r="3.5" fill="url(#goldGradLogo)"/>
        <path d="M45 88 H75 M50 84 H70" stroke="url(#goldGradLogo)" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M34 38 C45 35, 75 35, 86 38" stroke="url(#goldGradLogo)" stroke-width="2.4" stroke-linecap="round"/>
        <line x1="36" y1="38" x2="29" y2="58" stroke="url(#goldGradLogo)" stroke-width="1.4"/>
        <line x1="36" y1="38" x2="43" y2="58" stroke="url(#goldGradLogo)" stroke-width="1.4"/>
        <path d="M26 58 Q36 66 46 58 Z" fill="url(#goldGradLogo)"/>
        <line x1="84" y1="38" x2="77" y2="58" stroke="url(#goldGradLogo)" stroke-width="1.4"/>
        <line x1="84" y1="38" x2="91" y2="58" stroke="url(#goldGradLogo)" stroke-width="1.4"/>
        <path d="M74 58 Q84 66 94 58 Z" fill="url(#goldGradLogo)"/>
      </svg>
    `;
  }

  // Mapa de rutas reales para la barra de subdominio y el menú multipágina
  const MAPA_PAGINAS = {
    'index.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/inicio'
    },
    'el-despacho.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/el-despacho'
    },
    'areas-de-practica.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/areas-de-practica'
    },
    'area-extranjeria.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/area/extranjeria'
    },
    'area-derecho-penal.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/area/derecho-penal'
    },
    'area-derecho-de-familia.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/area/derecho-de-familia'
    },
    'area-derecho-laboral.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/area/derecho-laboral'
    },
    'preguntas-frecuentes.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/preguntas-frecuentes'
    },
    'blog.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/blog'
    },
    'contacto.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/contacto'
    },
    'textos-legales.html': {
      entorno: 'web_corporativa',
      dominio: 'www.meryemabogados.com',
      ruta: '/textos-legales'
    },
    'captacion.html': {
      entorno: 'landing_captacion',
      dominio: 'captacion.meryemabogados.com',
      ruta: '/solicitar-cita-prioritaria'
    },
    'crm.html': {
      entorno: 'crm_interno',
      dominio: 'crm.meryemabogados.com',
      ruta: '/panel-expedientes-kanban'
    }
  };

  // Diccionario Bilingüe de Claves Estructurales
  const TRADUCCIONES = {
    es: {
      nav_inicio: 'Inicio',
      nav_despacho: 'El Despacho',
      nav_areas: 'Áreas de Práctica',
      nav_extranjeria: 'Extranjería',
      nav_penal: 'Derecho Penal',
      nav_familia: 'Derecho de Familia',
      nav_laboral: 'Derecho Laboral',
      nav_faq: 'Preguntas Frecuentes',
      nav_blog: 'Blog',
      nav_contacto: 'Contacto',
      nav_cta_cita: 'Solicitar Consulta',
      footer_lema: 'Despacho jurídico dirigido por la letrada Meryem Oulad. Rigor técnico, trato personal directo y seguimiento exhaustivo de cada expediente en Español y Árabe.',
      footer_areas: 'Especialidades Jurídicas',
      footer_navegacion: 'Páginas del Despacho',
      footer_legales: 'Textos Legales (RGPD / LSSI)',
      footer_atencion: 'Atención Personalizada',
      footer_derechos: '© 2026 Meryem Abogados · Dirección Letrada: Meryem Oulad. Todos los derechos reservados.',
      float_whatsapp: 'WhatsApp Directo',
      float_llamar: 'Llamada Directa',
      env_label: 'Arquitectura 3 Entornos:',
      env_web: '1. Web Corporativa',
      env_landing: '2. Landing Captación',
      env_crm: '3. CRM Interno'
    },
    ar: {
      nav_inicio: 'الرئيسية',
      nav_despacho: 'عن المكتب / مريم أولاد',
      nav_areas: 'مجالات الممارسة',
      nav_extranjeria: 'قانون الهجرة والأجانب',
      nav_penal: 'القانون الجنائي',
      nav_familia: 'قانون الأسرة',
      nav_laboral: 'قانون العمل',
      nav_faq: 'الأسئلة الشائعة',
      nav_blog: 'المدونة القانونية',
      nav_contacto: 'اتصل بنا',
      nav_cta_cita: 'احجز استشارة قانونية',
      footer_lema: 'مكتب محاماة بإدارة المحامية مريم أولاد. دقة قانونية، تعامل شخصي مباشر ومتابعة شاملة لكل ملف باللغتين الإسبانية والعربية.',
      footer_areas: 'التخصصات القانونية',
      footer_navegacion: 'صفحات المكتب',
      footer_legales: 'النصوص القانونية وحماية البيانات',
      footer_atencion: 'رعاية قانونية مخصصة',
      footer_derechos: '© 2026 مكتب مريم للمحاماة (Meryem Abogados) · المحامية مريم أولاد. جميع الحقوق محفوظة.',
      float_whatsapp: 'واتساب مباشر',
      float_llamar: 'اتصال مباشر',
      env_label: 'بنية المنصة (3 بيئات):',
      env_web: '1. الموقع الرسمي',
      env_landing: '2. صفحة الاستقطاب',
      env_crm: '3. نظام إدارة الملفات CRM'
    }
  };

  // ==========================================================================
  // DICCIONARIO EXHAUSTIVO ESPAÑOL -> ÁRABE JURÍDICO (TODAS LAS PÁGINAS)
  // ==========================================================================
  const DICCIONARIO_FRASES_AR = {
    // Marca y Navegación General
    'MERYEM ABOGADOS': 'مكتب مريم للمحاماة',
    'Meryem Abogados': 'مكتب مريم للمحاماة',
    'Meryem Oulad': 'مريم أولاد',
    'Inicio': 'الرئيسية',
    'El Despacho': 'عن المكتب',
    'El Despacho / Sobre mí': 'عن المكتب / مريم أولاد',
    'Áreas de Práctica': 'مجالات الممارسة القانونية',
    'Extranjería': 'قانون الهجرة والأجانب',
    'Derecho Penal': 'القانون الجنائي',
    'Derecho de Familia': 'قانون الأسرة',
    'Derecho Laboral': 'قانون العمل',
    'Penal': 'الجنائي',
    'Familia': 'الأسرة',
    'Laboral': 'العمل',
    'Preguntas Frecuentes': 'الأسئلة الشائعة',
    'Blog': 'المدونة',
    'Blog Jurídico': 'المدونة القانونية',
    'Contacto': 'اتصل بنا',
    'Contacto y Ubicación SEO': 'الاتصال والتموقع المحلي',
    'Textos Legales (RGPD / LSSI)': 'النصوص القانونية وحماية البيانات',
    'Aviso Legal': 'الإشعار القانوني',
    'Política de Privacidad (RGPD)': 'سياسة الخصوصية (RGPD)',
    'Política de Cookies (LSSI)': 'سياسة ملفات تعريف الارتباط',
    'Landing de Captación →': 'صفحة الاستقطاب المباشر ←',
    'Acceso CRM Interno →': 'الدخول إلى نظام CRM الداخلي ←',
    '→': '←',

    // Página El Despacho (el-despacho.html)
    '01 · Trato Directo': '01 · تعامل شخصي مباشر',
    '02 · Atención Bilingüe': '02 · خدمة ثنائية اللغة',
    '03 · Organización Centralizada': '03 · تنظيم مركزي للملفات',
    '04 · Transparencia Deontológica': '04 · شفافية وأخلاقيات المهنة',

    // Página Inicio (index.html) y Formularios Comunes
    '● CRM < 24h': '● نظام CRM أقل من 24 ساعة',
    '● Garantía de respuesta < 24h': '● ضمان الرد خلال أقل من 24 ساعة',
    'Nombre completo *': 'الاسم الكامل *',
    'Nombre y Apellidos *': 'الاسم الكامل والنسب *',
    '1. Su Nombre y Apellidos *': '1. الاسم الكامل والنسب *',
    'Teléfono de contacto *': 'رقم الهاتف للتواصل *',
    'Teléfono de contacto directo *': 'رقم الهاتف للتواصل المباشر *',
    'Teléfono / WhatsApp *': 'رقم الهاتف / واتساب *',
    '2. Su Teléfono o WhatsApp *': '2. رقم الهاتف أو واتساب *',
    'Correo electrónico': 'البريد الإلكتروني',
    'Correo Electrónico': 'البريد الإلكتروني',
    'Especialidad jurídica *': 'التخصص القانوني *',
    'Área de Práctica Jurídica *': 'مجال الممارسة القانونية *',
    '3. Especialidad de su Consulta *': '3. تخصص استشارتك القانونية *',
    '4. Breve resumen de su caso (Opcional)': '4. ملخص موجز لقضيتك (اختياري)',
    'Explique brevemente su consulta *': 'اشرح استشارتك القانونية باختصار *',
    'Descripción de su consulta *': 'وصف استشارتك القانونية *',
    '¿Cómo nos ha conocido?': 'كيف تعرفت على مكتبنا؟',
    'Búsqueda en Internet / Web Corporativa': 'بحث عبر الإنترنت / الموقع الرسمي',
    'Perfil de Empresa en Google (SEO Local)': 'ملف المكتب على جوجل (Google)',
    'Recomendación de otro cliente': 'توصية من موكل سابق',
    'Contacto Telefónico Directo': 'اتصال هاتفي مباشر',
    'Web Corporativa': 'الموقع الرسمي للمكتب',
    'Landing de Captación': 'صفحة الاستقطاب',
    'Recomendación': 'توصية مباشرة',
    'Ficha de Google': 'ملف جوجل (Google)',

    // Placeholders de formularios
    'Ej. Karim Benali / Elena Martínez': 'مثال: كريم بنعلي / سارة العلمي',
    'Su nombre y apellidos': 'الاسم الكامل والنسب',
    'Su nombre completo': 'اسمك الكامل',
    'Escriba su nombre completo': 'اكتب اسمك الكامل',
    '+34 600 00 00 00': '+34 600 00 00 00',
    'correo@ejemplo.com': 'email@example.com',
    'cliente@ejemplo.com': 'client@example.com',
    'Indique su situación o si dispone de alguna notificación o plazo en curso...': 'اشرح وضعك القانوني أو ما إذا كان لديك إشعار أو أجل قانوني جاري...',
    'Ej. Solicitud de arraigo, nacionalidad, renovación NIE o recurso contra denegación...': 'مثال: طلب إقامة (Arraigo)، الجنسية الإسبانية، تجديد بطاقة NIE أو طعن في قرار رفض...',
    'Indique brevemente si tiene citación judicial, juzgado o motivo de la consulta...': 'وضح باختصار ما إذا كان لديك استدعاء قضائي أو اسم المحكمة أو سبب الاستشارة...',
    'Ej. Divorcio de mutuo acuerdo, custodia, convenio regulador o modificación de medidas...': 'مثال: طلاق بالتراضي، حضانة الأبناء، اتفاقية التنظيم الأسري أو تعديل الإجراءات...',
    'Indique cuándo recibió la carta de despido o qué reclamación laboral necesita...': 'وضح تاريخ استلام خطاب الفصل من العمل أو نوع المطالبة العمالية...',
    'Explique brevemente su situación y si cuenta con algún plazo o citación próxima...': 'اشرح وضعك باختصار وما إذا كان لديك موعد قضائي أو أجل قريب...',
    'Indique brevemente en qué podemos ayudarle...': 'وضح باختصار كيف يمكننا مساعدتك...',

    // Vista General de Áreas de Práctica (areas-de-practica.html)
    'Especialidad 01 · /area/extranjeria': 'التخصص 01 · قانون الهجرة والأجانب',
    'Especialidad 02 · /area/derecho-penal': 'التخصص 02 · القانون الجنائي',
    'Especialidad 03 · /area/derecho-de-familia': 'التخصص 03 · قانون الأسرة',
    'Especialidad 04 · /area/derecho-laboral': 'التخصص 04 · قانون العمل',
    'Atención en Español y Árabe': 'خدمة باللغتين الإسبانية والعربية',
    'Defensa Penal y Acusación Particular': 'الدفاع الجنائي والادعاء الخاص',
    'Trato Cercano y Confidencialidad': 'تعامل قريب وسرية تامة',
    '⚠️ Atención a plazos de 20 días hábiles': '⚠️ تنبيه هام: أجل 20 يوم عمل للطعن',
    'Arraigo Social / Laboral / Familiar': 'الإقامة الاجتماعية / المهنية / العائلية',
    'Nacionalidad Española': 'الجنسية الإسبانية',
    'Reagrupación Familiar': 'لم الشمل العائلي',
    'Recursos y Subsanaciones': 'الطعون الإدارية واستكمال الوثائق',
    'Acceder a la Ficha de Extranjería →': 'الدخول إلى صفحة قانون الهجرة ←',
    'Consultar sobre Extranjería': 'استشارة في قانون الهجرة',
    'Asistencia en Comisaría y Juzgado': 'المؤازرة لدى الشرطة والمحاكم',
    'Juicios Rápidos': 'المحاكمات السريعة',
    'Defensa y Acusación Particular': 'الدفاع والادعاء الخاص',
    'Recursos Penales': 'الطعون الجنائية',
    'Acceder a la Ficha de Derecho Penal →': 'الدخول إلى صفحة القانون الجنائي ←',
    'Consultar sobre Derecho Penal': 'استشارة في القانون الجنائي',
    'Divorcio Mutuo Acuerdo / Contencioso': 'الطلاق بالتراضي / القضائي',
    'Guarda y Custodia': 'الحضانة والرعاية',
    'Pensión de Alimentos': 'نفقة الأبناء',
    'Modificación de Medidas': 'تعديل الإجراءات الأسرية',
    'Acceder a la Ficha de Derecho de Familia →': 'الدخول إلى صفحة قانون الأسرة ←',
    'Consultar sobre Derecho de Familia': 'استشارة في قانون الأسرة',
    'Impugnación de Despidos': 'الطعن في الفصل من العمل',
    'Papeleta de Conciliación SMAC': 'طلب التوفيق العمالي (SMAC)',
    'Reclamación de Cantidad': 'المطالبة بالمستحقات والأجور',
    'Juzgados de lo Social': 'المحاكم الاجتماعية (العمالية)',
    'Acceder a la Ficha de Derecho Laboral →': 'الدخول إلى صفحة قانون العمل ←',
    'Consultar sobre Derecho Laboral': 'استشارة في قانون العمل',

    // Fichas individuales de Especialidades (Extranjería, Penal, Familia, Laboral)
    'Cambiar de Especialidad:': 'تغيير التخصص القانوني:',
    'Especialidad: Extranjería': 'التخصص: قانون الهجرة والأجانب',
    'Especialidad: Derecho Penal': 'التخصص: القانون الجنائي',
    'Especialidad: Derecho de Familia': 'التخصص: قانون الأسرة',
    'Especialidad: Derecho Laboral': 'التخصص: قانون العمل',
    '1. Autorizaciones por Arraigo': '1. تصاريح الإقامة الاستثنائية (Arraigo)',
    'Arraigo social (con o sin contrato según viabilidad legal), arraigo laboral, arraigo familiar y arraigo para la formación. Estudio previo de permanencia y vínculos.': 'الإقامة الاجتماعية (بعقد عمل أو بدونه حسب الشروط القانونية)، الإقامة المهنية، الإقامة العائلية والإقامة للتكوين. دراسة مسبقة لشروط الإقامة والروابط.',
    '2. Nacionalidad Española': '2. الجنسية الإسبانية عن طريق الإقامة',
    'Presentación telemática de expedientes de nacionalidad por residencia, opción o valor de simple presunción. Revisión de certificados, antecedentes y pruebas CCSE/DELE.': 'التقديم الإلكتروني لملفات الجنسية الإسبانية عن طريق الإقامة أو الاختيار. مراجعة الشهادات، السجل العدلي وامتحانات المعهد الثقافي (CCSE / DELE).',
    '3. Reagrupación y Tarjeta Comunitaria': '3. لم الشمل العائلي وبطاقة عائلة مواطن أوروبي',
    'Reagrupación familiar en régimen general y tarjeta de residencia de familiar de ciudadano de la Unión Europea. Acreditación de medios económicos y vivienda.': 'لم الشمل العائلي في النظام العام وبطاقة إقامة أفراد عائلة مواطن من الاتحاد الأوروبي. إثبات الموارد المالية والسكن المناسب.',
    '4. Renovaciones, Subsanaciones y Recursos': '4. تجديد الإقامات، استكمال الملفات والطعون',
    'Renovación de autorizaciones de residencia y trabajo, contestación a requerimientos en plazo legal, recursos de reposición y vía contencioso-administrativa.': 'تجديد تصاريح الإقامة والعمل، الرد على طلبات استكمال الوثائق داخل الأجل القانوني، طعون المراجعة والطعون القضائية الإدارية.',
    '• Pasaporte completo en vigor y, en su caso, tarjeta NIE o resguardo previo.': '• جواز سفر كامل ساري المفعول، وبطاقة الأجانب (NIE) أو وصل الطلب السابق إن وجد.',
    '• Volante o certificado de empadronamiento histórico y actual.': '• شهادة السكنى (Empadronamiento) الحالية والتاريخية.',
    '• Copia íntegra de cualquier notificación, requerimiento o resolución administrativa recibida (para verificar el plazo de alegaciones o recurso).': '• نسخة كاملة من أي إشعار أو طلب استكمال أو قرار إداري متوصل به (للتحقق من أجل تقديم الدفوع أو الطعن).',
    'Trámite o situación actual *': 'الإجراء المطلوب أو الوضع الحالي *',
    'Enviar Consulta de Extranjería': 'إرسال استشارة في قانون الهجرة',

    // Derecho Penal
    '1. Asistencia en Declaraciones y Juzgados': '1. المؤازرة في التصريحات وأمام المحاكم',
    'Asistencia letrada ante dependencias policiales y Juzgados de Instrucción. Entrevista reservada previa y revisión del atestado o diligencias previas.': 'المؤازرة القانونية أمام مراكز الشرطة ومحاكم التحقيق. مقابلة سرية مسبقة ومراجعة المحضر أو إجراءات التحقيق الأولية.',
    '2. Juicios Rápidos y Delitos Leves': '2. المحاكمات السريعة والجنح البسيطة',
    'Intervención en juicios rápidos (seguridad vial, alcoholemias, lesiones, hurtos), valoración técnica de conformidades o defensa en juicio oral.': 'التدخل في المحاكمات السريعة (السلامة الطرقية، الإصابات، السرقات)، التقييم القانوني الدقيق للصلح أو الدفاع في الجلسة العلنية.',
    '3. Procedimiento Abreviado y Defensa Penal': '3. المسطرة المختصرة والدفاع الجنائي',
    'Escritos de defensa, proposición de prueba documental, testifical y pericial, y defensa técnica en vista oral ante los Juzgados de lo Penal y Audiencias.': 'مذكرات الدفاع، تقديم الأدلة الكتابية والشهود والخبرة، والدفاع التقني أمام المحاكم الجنائية ومحاكم الاستئناف.',
    '4. Acusación Particular y Recursos': '4. الادعاء الخاص والطعون الجنائية',
    'Redacción de denuncias y querellas, personación como acusación particular, reclamación de responsabilidad civil y recursos de reforma y apelación.': 'صياغة الشكايات، الانتصاب كطرف مدني، المطالبة بالتعويض عن الضرر وتقديم طعون المراجعة والاستئناف.',
    '¿Ha recibido una citación judicial?': 'هل توصلتم باستدعاء قضائي؟',
    'Le recomendamos contactar con el despacho tan pronto reciba la cédula de citación para solicitar copia de las actuaciones con antelación suficiente y preparar su comparecencia con plenas garantías.': 'ننصحكم بالتواصل مع المكتب فور استلام الاستدعاء القضائي لطلب نسخة من الملف مسبقاً وتحضير مثولكم أمام القضاء بكامل الضمانات القانونية.',
    'Detalle del asunto o fecha de citación *': 'تفاصيل القضية أو تاريخ الاستدعاء القضائي *',
    'Registrar Consulta Penal Prioritaria': 'تسجيل استشارة جنائية ذات أولوية',

    // Derecho de Familia
    '1. Divorcio de Mutuo Acuerdo y Contencioso': '1. الطلاق بالتراضي والطلاق القضائي',
    'Negociación y redacción de convenios reguladores claros y duraderos, o interposición y contestación de demandas de divorcio contencioso.': 'التفاوض وصياغة اتفاقيات تنظيم أسري واضحة ومستدامة، أو تقديم دعاوى الطلاق القضائي والرد عليها.',
    '2. Guarda, Custodia y Régimen de Visitas': '2. الحضانة ونظام الزيارة',
    'Procedimientos de medidas paterno-filiales para parejas casadas o no casadas: custodia compartida o exclusiva, patria potestad y estancias.': 'إجراءات تنظيم العلاقة مع الأبناء للأزواج المتزوجين أو غير المتزوجين: الحضانة المشتركة أو المنفردة، السلطة الأبوية وفترات الزيارة.',
    '3. Pensión de Alimentos y Ejecuciones': '3. نفقة الأبناء وتنفيذ الأحكام',
    'Fijación de pensión de alimentos y gastos extraordinarios, así como demandas de ejecución por impago de pensiones o incumplimiento de convenio.': 'تحديد مبلغ النفقة والمصاريف الاستثنائية، بالإضافة إلى دعاوى التنفيذ في حال عدم أداء النفقة أو الإخلال بالاتفاقية.',
    '4. Modificación de Medidas y Liquidación': '4. تعديل الإجراءات وتصفية الذمة المالية',
    'Actualización judicial de medidas cuando cambian sustancialmente las circunstancias personales o económicas, y liquidación del régimen económico.': 'التحيين القضائي للإجراءات عند تغير الظروف الشخصية أو المادية بشكل جوهري، وتصفية النظام المالي للزواج.',
    'Situación que desea consultar *': 'الوضع الأسري الذي ترغبون في استشارتنا بشأنه *',
    'Enviar Consulta de Familia': 'إرسال استشارة في قانون الأسرة',

    // Derecho Laboral
    '⚠️ Importante: Plazo de caducidad de 20 días hábiles por despido': '⚠️ هام جداً: أجل سقوط الحق هو 20 يوم عمل للطعن في الفصل',
    '1. Impugnación de Despidos': '1. الطعن في الفصل من العمل',
    'Despidos disciplinarios, objetivos o tácitos. Revisión de carta de despido, cálculo exacto de indemnización por despido improcedente o nulo y liquidación de finiquito.': 'الفصل التأديبي أو الموضوعي أو التعسفي. مراجعة خطاب الفصل، الحساب الدقيق للتعويض القانوني ومراجعة التصفية النهائية (Finiquito).',
    '2. Reclamación de Cantidad y Salarios': '2. المطالبة بالأجور والمستحقات المالية',
    'Reclamación de nóminas impagadas, horas extraordinarias, diferencias salariales según convenio colectivo aplicable e intereses por mora salarial.': 'المطالبة بالرواتب غير المدفوعة، الساعات الإضافية، فروق الأجور حسب الاتفاقية الجماعية وفوائد التأخير.',
    '3. Conciliación Laboral (SMAC)': '3. التوفيق والمصالحة العمالية (SMAC)',
    'Redacción y presentación de la papeleta de conciliación administrativa previa y asistencia letrada durante el acto de conciliación para negociar acuerdos con garantías.': 'صياغة وتقديم طلب التوفيق الإداري المسبق والمؤازرة القانونية خلال جلسة المصالحة للتفاوض على اتفاقيات تحفظ حقوقكم.',
    '4. Condiciones Laborales y Sanciones': '4. ظروف العمل والعقوبات التأديبية',
    'Modificación sustancial de condiciones de trabajo, impugnación de sanciones disciplinarias, extinción de contrato por incumplimiento empresarial y tutela de derechos.': 'التعديل الجوهري لظروف العمل، الطعن في العقوبات التأديبية، فسخ العقد بسبب إخلال المشغل وحماية الحقوق الأساسية للعامل.',
    'Fecha de notificación o motivo laboral *': 'تاريخ الإشعار أو سبب الاستشارة العمالية *',
    'Enviar Consulta Laboral': 'إرسال استشارة في قانون العمل',

    // Preguntas Frecuentes (preguntas-frecuentes.html)
    'Todas': 'الكل',
    'Funcionamiento del Despacho': 'نظام عمل المكتب',
    'Penal, Familia y Laboral': 'الجنائي، الأسرة والعمل',
    'Realizar una Consulta Personalizada': 'طلب استشارة قانونية مخصصة',

    // Blog Jurídico (blog.html)
    'Por Meryem Oulad · Meryem Abogados': 'بقلم المحامية مريم أولاد · مكتب مريم للمحاماة',
    'Claves para presentar un expediente de Arraigo o Nacionalidad sin requerimientos de subsanación': 'مفاتيح تقديم ملف الإقامة (Arraigo) أو الجنسية الإسبانية دون طلبات استكمال أو تأخير',
    'Analizamos los errores documentales más frecuentes en los expedientes de extranjería (vigencia de certificados, apostillas, medios económicos y empadronamiento) y cómo revisarlos antes del registro telemático.': 'نحلل الأخطاء الوثائقية الأكثر شيوعاً في ملفات الهجرة (صلاحية الشهادات، التصديق بـ Apostilla، الموارد المالية وشهادة السكنى) وكيفية مراجعتها قبل التقديم الإلكتروني.',
    '¿Cómo actuar ante una carta de despido y por qué es vital el plazo de 20 días hábiles?': 'كيف تتصرف عند استلام خطاب الفصل من العمل ولماذا يعتبر أجل 20 يوم عمل حاسماً؟',
    'Guía práctica sobre la firma como «no conforme», la revisión del finiquito, el cálculo de la indemnización legal y la presentación de la papeleta de conciliación ante el SMAC.': 'دليل عملي حول التوقيع بعبارة «غير موافق»، مراجعة التصفية المالية، حساب التعويض القانوني وتقديم طلب المصالحة أمام هيئة التوفيق (SMAC).',
    'Aspectos esenciales de un Convenio Regulador en divorcios y medidas paterno-filiales': 'الجوانب الأساسية لاتفاقية التنظيم الأسري في حالات الطلاق وإجراءات الأبناء',
    'Qué debe regularse con precisión respecto a guarda y custodia, régimen de estancias, uso de la vivienda familiar y contribución a los alimentos y gastos extraordinarios.': 'ما يجب تنظيمه بدقة بخصوص الحضانة، نظام الزيارة والعطل، استعمال مسكن الأسرة والمساهمة في النفقة والمصاريف الاستثنائية.',
    'La importancia de preparar la declaración ante el Juzgado de Instrucción o en Juicio Rápido': 'أهمية التحضير المسبق للتصريح أمام محكمة التحقيق أو في المحاكمات السريعة',
    'Por qué resulta indispensable el acceso previo al atestado y a las diligencias judiciales para garantizar el derecho de defensa desde la primera comparecencia.': 'لماذا يعد الاطلاع المسبق على محضر الشرطة وإجراءات التحقيق أمراً لا غنى عنه لضمان حق الدفاع منذ المثول الأول.',
    'Leer artículo completo →': 'قراءة المقال كاملاً ←',
    'Ficha de Extranjería': 'صفحة قانون الهجرة',
    'Ficha de Laboral': 'صفحة قانون العمل',
    'Ficha de Familia': 'صفحة قانون الأسرة',
    'Ficha de Derecho Penal': 'صفحة القانون الجنائي',
    'Autora: Meryem Oulad · Meryem Abogados': 'الكاتبة: المحامية مريم أولاد · مكتب مريم للمحاماة',
    'Consultar mi caso con Meryem Oulad →': 'استشارة المحامية مريم أولاد في قضيتي ←',

    // Contacto y SEO Local (contacto.html)
    'Contacto y Cita Previa': 'الاتصال وحجز موعد مسبق',
    'Entrada Directa al CRM': 'تسجيل مباشر في نظام CRM',
    'Enviar Consulta y Generar Expediente en el CRM': 'إرسال الاستشارة وفتح ملف في نظام المكتب',
    'Canales de Atención Directa': 'قنوات التواصل المباشر',
    'Si prefiere contactar por vía telefónica o WhatsApp, cada pulsación queda registrada en tiempo real en el panel de analítica del despacho.': 'إذا كنتم تفضلون التواصل عبر الهاتف أو واتساب، يتم تسجيل كل تفاعل فوراً في لوحة الإحصائيات الخاصة بالمكتب.',
    'Llamada Directa': 'اتصال هاتفي مباشر',
    'WhatsApp Oficial': 'واتساب الرسمي للمكتب',
    'Dirección Letrada:': 'الإدارة القانونية:',
    'Idiomas de atención:': 'لغات الخدمة:',
    'Español y Árabe (ES | العربية)': 'الإسبانية والعربية (ES | العربية)',
    'Modalidad:': 'طريقة الاستقبال:',
    'Atención presencial con cita previa y asesoramiento telemático.': 'استقبال حضوري بموعد مسبق واستشارات قانونية عن بُعد.',
    'Estructura SEO Local': 'بنية التموقع المحلي (SEO Local)',
    'Perfil de Empresa en Google · Meryem Abogados': 'ملف المكتب على جوجل · مكتب مريم للمحاماة',
    'Ficha Optimizada': 'بطاقة مهيأة',
    'Nombre Oficial del Perfil:': 'الاسم الرسمي للملف:',
    'Meryem Abogados · Meryem Oulad': 'مكتب مريم للمحاماة · المحامية مريم أولاد',
    'Categorías de Posicionamiento Local:': 'فئات التخصص القانوني المحلي:',
    'Abogado de extranjería': 'محامية هجرة وأجانب',
    'Abogado penalista': 'محامية جنائية',
    'Abogado de derecho de familia': 'محامية قضايا الأسرة',
    'Abogado laboralista': 'محامية قضايا العمل',
    'Servicios Jurídicos Indexados:': 'الخدمات القانونية المسجلة:',
    'Arraigos y Nacionalidad Española · Asistencia Penal y Juzgados · Divorcios y Convenio Regulador · Impugnación de Despidos y Conciliación SMAC.': 'الإقامة والجنسية الإسبانية · الدفاع الجنائي والمحاكم · الطلاق والاتفاقيات الأسرية · الطعن في الفصل والمصالحة العمالية.',
    'Atributos Destacados de la Ficha:': 'مميزات الخدمة في المكتب:',
    '✓ Atención en Español y Árabe · ✓ Cita online conectada al CRM · ✓ Respuesta < 24h': '✓ خدمة بالإسبانية والعربية · ✓ حجز موعد متصل بالنظام · ✓ رد خلال أقل من 24 ساعة',

    // Textos Legales (textos-legales.html)
    '01 · Ley 34/2002 (LSSI-CE)': '01 · القانون 34/2002 (LSSI-CE)',
    'Aviso Legal e Información General': 'الإشعار القانوني والمعلومات العامة',
    '02 · RGPD (UE) 2016/679 y LOPDGDD 3/2018': '02 · اللائحة الأوروبية لحماية البيانات (RGPD) والقانون التنظيمي 3/2018',
    'Política de Privacidad y Protección de Datos': 'سياسة الخصوصية وحماية البيانات الشخصية',
    '03 · Normativa LSSI y Guía AEPD': '03 · لوائح خدمات المعلومات ودليل وكالة حماية البيانات',
    'Política de Cookies y Almacenamiento Local': 'سياسة ملفات تعريف الارتباط والتخزين المحلي',

    // Landing de Captación (captacion.html)
    'Especialidad de la Campaña:': 'تخصص الحملة الإعلانية:',
    '(Adapta el titular persuasivo y preselecciona el área en el formulario)': '(يقوم بتكييف العنوان وتحديد التخصص تلقائياً في النموذج)',
    'Trato directo con la letrada Meryem Oulad': 'تعامل شخصي مباشر مع المحامية مريم أولاد',
    'Sin intermediarios comerciales: su asunto es valorado directamente por la abogada titular del despacho.': 'بدون وسطاء تجاريين: تتم دراسة قضيتكم مباشرة من طرف المحامية المديرة للمكتب.',
    'Registro automático de su expediente (< 24 horas)': 'تسجيل تلقائي لملفكم (رد في أقل من 24 ساعة)',
    'Al enviar este formulario breve, su consulta genera un código de expediente único y activa una alerta de contacto inmediato.': 'عند إرسال هذا النموذج المختصر، يتم إنشاء رقم ملف خاص بكم وتفعيل تنبيه للتواصل الفوري.',
    'Atención Bilingüe en Español y Árabe (ES | العربية)': 'رعاية قانونية باللغتين الإسبانية والعربية (ES | العربية)',
    'Explicación clara de cada trámite, documentación necesaria y presupuesto mediante hoja de encargo profesional.': 'شرح واضح لكل إجراء قانوني، الوثائق المطلوبة والأتعاب المهنية بشفافية تامة.',
    '📊 Medición Instalada en Tiempo Real (Google Ads / Meta Ads)': '📊 قياس الأداء الفوري للحملات (Google Ads / Meta Ads)',
    'Ver en CRM →': 'عرض في نظام CRM ←',
    'Formularios Landing': 'نماذج صفحة الاستقطاب',
    'Clics en WhatsApp': 'نقرات واتساب',
    'Clics en Teléfono': 'نقرات الاتصال الهاتفي',
    'Respuesta Garantizada < 24 Horas': 'رد مضمون خلال أقل من 24 ساعة',
    'Deje sus datos en menos de 30 segundos y la letrada Meryem Oulad se pondrá en contacto con usted.': 'اترك بياناتك في أقل من 30 ثانية وستتواصل معك المحامية مريم أولاد.',
    'Extranjería (Arraigo, Nacionalidad, NIE, Recursos)': 'قانون الهجرة (الإقامة، الجنسية، تجديد NIE، الطعون)',
    'Derecho Penal (Citación Judicial, Defensa, Juicio Rápido)': 'القانون الجنائي (استدعاء قضائي، دفاع، محاكمة سريعة)',
    'Derecho de Familia (Divorcio, Custodia, Convenio)': 'قانون الأسرة (الطلاق، الحضانة، اتفاقية التنظيم)',
    'Derecho Laboral (Despido, Finiquito, Reclamación)': 'قانون العمل (الفصل، المستحقات المالية، الشكايات)',
    'Solicitar Primera Valoración Ahora →': 'اطلب تقييم قضيتك الآن ←',
    '¿Prefiere hablar directamente en este momento?': 'هل تفضل التحدث معنا مباشرة الآن؟',
    '📞 Llamar al Despacho': '📞 الاتصال بالمكتب',
    '💬 Abrir WhatsApp': '💬 محادثة عبر واتساب',
    'Ir a la Web Corporativa Completa →': 'الانتقال إلى الموقع الرسمي الكامل ←',

    // CRM Interno (crm.html)
    'MERYEM ABOGADOS · CRM': 'مكتب مريم للمحاماة · نظام CRM',
    'Panel Privado': 'لوحة التحكم الخاصة',
    'Registrar Consulta Manual (Teléfono / Recomendación)': 'تسجيل استشارة يدوياً (هاتف / توصية)',
    '↻ Restaurar Demo': '↻ استعادة بيانات العرض',
    'Consultas Recibidas (Mes)': 'الاستشارات الواردة (الشهر)',
    'Pendientes de primer contacto:': 'في انتظار التواصل الأول:',
    '% Consultas que Terminan en Cita': 'نسبة الاستشارات المتحولة إلى موعد',
    'Con cita / presupuesto / cliente:': 'بموعد / عرض أتعاب / موكل:',
    'Desglose por Origen de Consulta': 'توزيع الاستشارات حسب المصدر',
    '5 Canales': '5 قنوات',
    'Clics en Tiempo Real & SLA < 24h': 'النقرات الفورية والتزام < 24 ساعة',
    'Clics WhatsApp': 'نقرات واتساب',
    'Clics Teléfono': 'نقرات الهاتف',
    'Recordatorios < 24h activos:': 'تنبيهات < 24 ساعة النشطة:',
    'Todas las Áreas (4)': 'جميع التخصصات (4)',
    'Todos los Orígenes': 'جميع المصادر',
    '⚡ Solo con alerta < 24h pendiente': '⚡ فقط الملفات ذات تنبيه < 24 ساعة',
    'Consulta nueva': 'استشارة جديدة',
    'Contactado': 'تم التواصل',
    'Cita agendada': 'موعد محجوز',
    'Presupuesto enviado': 'تم إرسال عرض الأتعاب',
    'Cliente': 'موكل رسمي',
    'Archivado': 'مؤرشف',
    '✓ Atendido': '✓ تمت المتابعة',
    'Abrir ficha →': 'فتح الملف ←',
    'Eliminar': 'حذف الملف',
    'Guardar Cambios': 'حفظ التعديلات',
    '1. Datos del Cliente y Estado en el Embudo': '1. بيانات الموكل وحالة الملف',
    '2. Cinco Plantillas de Respuesta Rápida (WhatsApp y Correo)': '2. النماذج الخمسة للرد السريع (واتساب والبريد)',
    '3. Recordatorios y Avisos (< 24 Horas)': '3. التنبيهات والمهام (أقل من 24 ساعة)',
    '4. Notas Internas del Expediente': '4. الملاحظات الداخلية للملف',
    'Enviar en 1 Clic por WhatsApp Web': 'إرسال بنقرة واحدة عبر واتساب',
    'Enviar en 1 Clic por Correo (mailto)': 'إرسال بنقرة واحدة عبر البريد',
    '📋 Copiar': '📋 نسخ النص',
    '＋ Añadir Nota al Historial del Expediente': '＋ إضافة ملاحظة إلى سجل الملف'
  };

  // Bloques HTML complejos bilingües (Respuestas FAQ, Textos Legales, Avisos)
  const BLOQUES_HTML_AR = [
    {
      selector: '[data-faq-item="despacho"]:nth-of-type(1) .faq-content',
      ar: 'في <strong>مكتب مريم للمحاماة</strong> يتم تسجيل جميع الاستشارات المرسلة عبر الموقع أو صفحة الاستقطاب تلقائياً في نظام إدارة الملفات الداخلي (CRM)، مع تفعيل تنبيه ذي أولوية لضمان الرد على كل استشارة خلال أقل من <strong>24 ساعة</strong>.'
    },
    {
      selector: '[data-faq-item="despacho"]:nth-of-type(2) .faq-content',
      ar: 'تتولى المحامية المديرة للمكتب <strong>مريم أولاد</strong> شخصياً دراسة وإدارة ملفكم القانوني، مع ضمان تواصل مباشر وشفاف دون وسطاء طوال جميع مراحل المسطرة.'
    },
    {
      selector: '[data-faq-item="despacho"]:nth-of-type(3) .faq-content',
      ar: 'نعم. نوفر في <strong>مكتب مريم للمحاماة</strong> رعاية قانونية متكاملة باللغتين <strong>الإسبانية</strong> و<strong>العربية</strong>، لتمكينكم من عرض قضيتكم وفهم كل وثيقة أو عقد أو قرار قضائي بدقة تامة.'
    },
    {
      selector: '[data-faq-item="extranjeria"] .faq-content',
      ar: 'ننصح بإحضار جواز السفر أو بطاقة الهوية للأجانب (NIE)، شهادة السكنى (Empadronamiento)، وأي قرار أو إشعار أو طلب استكمال وثائق توصلتم به من مكتب الهجرة أو وزارة العدل.'
    },
    {
      selector: '[data-faq-item="penal-familia-laboral"] .faq-content',
      ar: 'في كلتا الحالتين يعتبر عامل الوقت حاسماً. في قانون العمل يبلغ أجل الطعن في الفصل <strong>20 يوم عمل</strong>، وفي القانون الجنائي من الضروري مراجعة ملف التحقيق قبل الإدلاء بأي تصريح. تواصلوا معنا فوراً عبر النموذج أو الهاتف أو واتساب مع ذكر تاريخ الإشعار.'
    },
    {
      selector: '[data-faq-item="despacho"]:nth-of-type(6) .faq-content',
      ar: 'نعم. بعد دراسة ملفكم في الاستشارة الأولى، نقدم لكم مقترح عمل قانوني و<strong>ورقة تكليف مهني (Hoja de encargo)</strong> تتضمن بالتفصيل الإجراءات المزمع القيام بها والأتعاب المتفق عليها.'
    },
    {
      selector: '#aviso-legal div.text-sm',
      ar: `
        <p>امتثالاً لواجب الإخبار المنصوص عليه في المادة 10 من القانون 34/2002 المؤرخ في 11 يوليو والمتعلق بخدمات مجتمع المعلومات والتجارة الإلكترونية (LSSI-CE)، نحيطكم علماً بأن هذا الموقع الإلكتروني تابع للمكتب المهني <strong>مكتب مريم للمحاماة (Meryem Abogados)</strong>، تحت الإدارة القانونية للمحامية <strong>مريم أولاد (Meryem Oulad)</strong>.</p>
        <p><strong>النشاط المهني:</strong> ممارسة مهنة المحاماة والاستشارة القانونية المتخصصة في قانون الهجرة والأجانب، القانون الجنائي، قانون الأسرة وقانون العمل، وفقاً لقواعد وأخلاقيات مهنة المحاماة في إسبانيا.</p>
        <p><strong>الملكية الفكرية والصناعية:</strong> جميع المضامين، النصوص القانونية، البنية متعددة الصفحات، الشعار الرسمي والتصميم البصري لمكتب <strong>مريم للمحاماة</strong> محمية بموجب قوانين الملكية الفكرية والصناعية.</p>
      `
    },
    {
      selector: '#privacidad div.text-sm',
      ar: `
        <p><strong>المسؤول عن معالجة البيانات:</strong> المحامية مريم أولاد · مكتب مريم للمحاماة (Meryem Abogados).</p>
        <p><strong>الغاية من المعالجة:</strong> تُدرج البيانات الشخصية المقدمة عبر نماذج الاستشارة في الموقع الرسمي أو صفحة الاستقطاب ضمن نظام إدارة الملفات بالمكتب بهدف وحيد يتمثل في الرد على استشارتكم القانونية في أقل من 24 ساعة، تنظيم المواعيد، وإدارة العلاقة المهنية عند الاقتضاء.</p>
        <p><strong>الأساس القانوني:</strong> الموافقة الصريحة للمعني بالأمر عند إرسال النموذج (المادة 6.1.a من لائحة RGPD) وتطبيق الإجراءات التعاقدية أو السابقة للتعاقد بطلب من المعني بالأمر (المادة 6.1.b من لائحة RGPD).</p>
        <p><strong>السر المهني:</strong> تخضع جميع البيانات والمعلومات المتبادلة مع المكتب لواجب السر المهني الصارم للمحاماة، ولا يتم تفويتها لأي طرف ثالث إلا بموجب التزام قانوني أو ضرورة مسطرية للدفاع عن حقوق الموكل.</p>
        <p><strong>حقوق حماية البيانات:</strong> يمكن للمستخدم ممارسة حقوق الولوج، التصحيح، الحذف، التعرض، تقييد المعالجة ونقل البيانات في أي وقت لدى إدارة المكتب.</p>
      `
    },
    {
      selector: '#cookies div.text-sm',
      ar: `
        <p>يستخدم هذا الموقع التخزين التقني المحلي الضروري فقط لحفظ اختيار اللغة (الإسبانية / العربية مع دعم القراءة من اليمين إلى اليسار RTL) وضمان التشغيل السليم لنماذج الاتصال وقياس جودة خدمة الموكلين.</p>
      `
    }
  ];

  function obtenerArchivoActual() {
    const path = window.location.pathname;
    const file = path.split('/').pop();
    if (!file || file === '') return 'index.html';
    return MAPA_PAGINAS[file] ? file : 'index.html';
  }

  function obtenerIdiomaActual() {
    return localStorage.getItem(LANG_STORAGE_KEY) === 'ar' ? 'ar' : 'es';
  }

  function cambiarIdioma(nuevoIdioma) {
    const lang = nuevoIdioma === 'ar' ? 'ar' : 'es';
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    aplicarIdiomaDOM(lang);
    window.dispatchEvent(new CustomEvent('meryem:idioma-cambiado', { detail: { idioma: lang } }));
  }

  // Motor de traducción integral del DOM
  function aplicarIdiomaDOM(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // 1. Elementos con [data-i18n]
    const dict = TRADUCCIONES[lang] || TRADUCCIONES.es;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // 2. Elementos con atributos explícitos [data-es] y [data-ar]
    document.querySelectorAll('[data-es][data-ar]').forEach((el) => {
      const texto = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-es');
      if (texto) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = texto;
        } else {
          el.innerHTML = texto;
        }
      }
    });

    // 3. Bloques complejos por selector (FAQ answers, Textos Legales)
    BLOQUES_HTML_AR.forEach((bloque) => {
      document.querySelectorAll(bloque.selector).forEach((el) => {
        if (!el.dataset.esHtmlOriginal) {
          el.dataset.esHtmlOriginal = el.innerHTML;
        }
        el.innerHTML = lang === 'ar' ? bloque.ar : el.dataset.esHtmlOriginal;
      });
    });

    // 4. Traducción automática de todos los nodos de texto y opciones en la página
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent) return;
      if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') return;
      if (parent.hasAttribute('data-es') && parent.hasAttribute('data-ar')) return;
      if (parent.hasAttribute('data-i18n')) return;

      if (node._esOriginal === undefined) {
        node._esOriginal = node.nodeValue;
      }

      const rawOriginal = node._esOriginal;
      const trimmed = rawOriginal.trim().replace(/\s+/g, ' ');
      if (!trimmed) return;

      if (lang === 'es') {
        node.nodeValue = rawOriginal;
      } else if (DICCIONARIO_FRASES_AR[trimmed]) {
        const leadingSpace = rawOriginal.match(/^\s*/)[0];
        const trailingSpace = rawOriginal.match(/\s*$/)[0];
        node.nodeValue = leadingSpace + DICCIONARIO_FRASES_AR[trimmed] + trailingSpace;
      }
    });

    // 5. Traducción de placeholders en inputs y textareas
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach((inp) => {
      if (inp.hasAttribute('data-es') && inp.hasAttribute('data-ar')) return;
      if (!inp.dataset.esPlaceholderOriginal) {
        inp.dataset.esPlaceholderOriginal = inp.getAttribute('placeholder') || '';
      }
      const orig = inp.dataset.esPlaceholderOriginal.trim();
      if (lang === 'es') {
        inp.setAttribute('placeholder', inp.dataset.esPlaceholderOriginal);
      } else if (DICCIONARIO_FRASES_AR[orig]) {
        inp.setAttribute('placeholder', DICCIONARIO_FRASES_AR[orig]);
      }
    });

    // 6. Actualizar estado visual de los botones del selector de idioma ES | العربية
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang-btn');
      if (btnLang === lang) {
        btn.classList.add('bg-[#D4AF37]', 'text-[#08080A]', 'font-bold');
        btn.classList.remove('text-gray-300', 'hover:text-white');
      } else {
        btn.classList.remove('bg-[#D4AF37]', 'text-[#08080A]', 'font-bold');
        btn.classList.add('text-gray-300', 'hover:text-white');
      }
    });
  }

  // Renderiza la barra superior discreta de entornos (Web Corporativa / Landing Captación / CRM Interno)
  function renderizarBarraEntornos() {
    const contenedor = document.getElementById('environment-topbar');
    if (!contenedor) return;

    const archivo = obtenerArchivoActual();
    const info = MAPA_PAGINAS[archivo] || MAPA_PAGINAS['index.html'];
    const metricas = window.MeryemCRM ? window.MeryemCRM.obtenerMetricas() : {
      alertas_24h_pendientes: 1,
      clics_whatsapp: 4,
      clics_telefono: 3
    };

    const esWeb = info.entorno === 'web_corporativa';
    const esLanding = info.entorno === 'landing_captacion';
    const esCRM = info.entorno === 'crm_interno';

    contenedor.innerHTML = `
      <div class="bg-[#050507] border-b border-[#D4AF37]/25 text-xs text-gray-300 px-3 sm:px-6 py-2">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <!-- Selector de los 3 Entornos / Subdominios -->
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="hidden md:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold mr-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span data-i18n="env_label">Arquitectura 3 Entornos:</span>
            </span>
            <a href="index.html" class="px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
              esWeb
                ? 'bg-[#D4AF37] text-[#08080A] font-semibold shadow-sm'
                : 'bg-[#121218] text-gray-300 hover:text-white border border-white/10'
            }">
              <span>🌐</span>
              <span data-i18n="env_web">1. Web Corporativa</span>
            </a>
            <a href="captacion.html" class="px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
              esLanding
                ? 'bg-[#D4AF37] text-[#08080A] font-semibold shadow-sm'
                : 'bg-[#121218] text-gray-300 hover:text-white border border-white/10'
            }">
              <span>🎯</span>
              <span data-i18n="env_landing">2. Landing Captación</span>
            </a>
            <a href="crm.html" class="px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
              esCRM
                ? 'bg-[#D4AF37] text-[#08080A] font-semibold shadow-sm'
                : 'bg-[#121218] text-gray-300 hover:text-white border border-[#D4AF37]/30'
            }">
              <span>🗂️</span>
              <span data-i18n="env_crm">3. CRM Interno</span>
              <span id="topbar-badge-alertas" class="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                esCRM ? 'bg-[#08080A] text-[#D4AF37]' : 'bg-[#D4AF37]/20 text-[#FFF5C0]'
              }">
                ${metricas.alertas_24h_pendientes} &lt;24h
              </span>
            </a>
          </div>

          <!-- Visor de Ruta Multipágina Activa + Analítica en Vivo + Selector Idioma -->
          <div class="flex items-center gap-3">
            <div dir="ltr" class="hidden lg:flex items-center gap-1.5 bg-[#0E0E14] border border-white/10 px-2.5 py-1 rounded text-[11px] font-mono text-gray-300">
              <span class="text-emerald-400">🔒 https://</span>
              <span class="text-[#D4AF37] font-semibold">${info.dominio}</span>
              <span class="text-white">${info.ruta}</span>
            </div>

            <div class="hidden sm:flex items-center gap-2 text-[11px] bg-[#101016] border border-white/10 px-2.5 py-1 rounded">
              <span title="Clics registrados en WhatsApp">💬 WA: <strong id="topbar-wa-count" class="text-emerald-400">${metricas.clics_whatsapp}</strong></span>
              <span class="text-gray-600">|</span>
              <span title="Clics registrados en Teléfono">📞 Tel: <strong id="topbar-tel-count" class="text-[#D4AF37]">${metricas.clics_telefono}</strong></span>
            </div>

            <!-- Selector Bilingüe ES | العربية -->
            <div class="inline-flex items-center rounded-md bg-[#121218] border border-[#D4AF37]/40 p-0.5 text-xs">
              <button type="button" data-lang-btn="es" class="px-2.5 py-0.5 rounded transition">ES</button>
              <button type="button" data-lang-btn="ar" class="px-2.5 py-0.5 rounded transition">العربية</button>
            </div>
          </div>
        </div>
      </div>
    `;

    contenedor.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => {
        cambiarIdioma(btn.getAttribute('data-lang-btn'));
      });
    });
  }

  // Renderiza la Cabecera Institucional Multipágina (para el Entorno 1: www.meryemabogados.com)
  function renderizarCabeceraCorporativa() {
    const header = document.getElementById('corporate-header');
    if (!header) return;

    const archivo = obtenerArchivoActual();
    const esArea = archivo.startsWith('area-') || archivo === 'areas-de-practica.html';

    const linkClass = (target) => {
      const activo = archivo === target;
      return activo
        ? 'text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37] pb-1'
        : 'text-gray-200 hover:text-[#D4AF37] transition pb-1';
    };

    header.innerHTML = `
      <header class="sticky top-0 z-40 luxury-glass border-b border-[#D4AF37]/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-22 py-3">
            <!-- Logotipo Oficial: Balanza + Corona de Laurel + MERYEM ABOGADOS -->
            <a href="index.html" class="flex items-center gap-3.5 group focus:outline-none">
              <div class="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                ${obtenerEmblemaSVG('w-13 h-13')}
              </div>
              <div>
                <span class="block font-serif-legal text-lg sm:text-xl font-bold tracking-widest text-gold-gradient"
                      data-es="MERYEM ABOGADOS"
                      data-ar="مكتب مريم للمحاماة">
                  MERYEM ABOGADOS
                </span>
                <span class="block text-[11px] uppercase tracking-[0.22em] text-gray-400"
                      data-es="Meryem Oulad · Dirección Letrada"
                      data-ar="مريم أولاد · الإدارة القانونية">
                  Meryem Oulad · Dirección Letrada
                </span>
              </div>
            </a>

            <!-- Navegación Multipágina Real (Escritorio) -->
            <nav class="hidden xl:flex items-center gap-6 text-sm" aria-label="Menú Principal">
              <a href="index.html" class="${linkClass('index.html')}" data-i18n="nav_inicio">Inicio</a>
              <a href="el-despacho.html" class="${linkClass('el-despacho.html')}" data-i18n="nav_despacho">El Despacho</a>

              <!-- Desplegable de las 4 Áreas de Práctica reales -->
              <div class="relative group">
                <a href="areas-de-practica.html" class="inline-flex items-center gap-1 ${
                  esArea
                    ? 'text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37] pb-1'
                    : 'text-gray-200 hover:text-[#D4AF37] transition pb-1'
                }">
                  <span data-i18n="nav_areas">Áreas de Práctica</span>
                  <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </a>
                <div class="absolute left-0 mt-2 w-64 rounded-xl bg-[#101014] border border-[#D4AF37]/35 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                  <a href="areas-de-practica.html" class="block px-3.5 py-2 rounded-lg text-xs uppercase tracking-wider text-[#D4AF37] font-semibold hover:bg-white/5 border-b border-white/10 mb-1"
                     data-es="Ver las 4 Especialidades →"
                     data-ar="عرض التخصصات الأربعة ←">
                    Ver las 4 Especialidades →
                  </a>
                  <a href="area-extranjeria.html" class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-gray-200 hover:bg-[#D4AF37]/15 hover:text-[#FFF5C0] transition">
                    <span data-i18n="nav_extranjeria">Extranjería</span>
                    <span class="text-xs text-[#D4AF37]">→</span>
                  </a>
                  <a href="area-derecho-penal.html" class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-gray-200 hover:bg-[#D4AF37]/15 hover:text-[#FFF5C0] transition">
                    <span data-i18n="nav_penal">Derecho Penal</span>
                    <span class="text-xs text-[#D4AF37]">→</span>
                  </a>
                  <a href="area-derecho-de-familia.html" class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-gray-200 hover:bg-[#D4AF37]/15 hover:text-[#FFF5C0] transition">
                    <span data-i18n="nav_familia">Derecho de Familia</span>
                    <span class="text-xs text-[#D4AF37]">→</span>
                  </a>
                  <a href="area-derecho-laboral.html" class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-gray-200 hover:bg-[#D4AF37]/15 hover:text-[#FFF5C0] transition">
                    <span data-i18n="nav_laboral">Derecho Laboral</span>
                    <span class="text-xs text-[#D4AF37]">→</span>
                  </a>
                </div>
              </div>

              <a href="preguntas-frecuentes.html" class="${linkClass('preguntas-frecuentes.html')}" data-i18n="nav_faq">Preguntas Frecuentes</a>
              <a href="blog.html" class="${linkClass('blog.html')}" data-i18n="nav_blog">Blog</a>
              <a href="contacto.html" class="${linkClass('contacto.html')}" data-i18n="nav_contacto">Contacto</a>
            </nav>

            <!-- Acciones Derecha -->
            <div class="hidden md:flex items-center gap-3">
              <a href="contacto.html" class="bg-gold-gradient px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition shadow-lg">
                <span data-i18n="nav_cta_cita">Solicitar Consulta</span>
              </a>
            </div>

            <!-- Botón Menú Móvil -->
            <button id="mobile-menu-toggle" type="button" class="xl:hidden p-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10" aria-label="Abrir menú">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Menú Desplegable Móvil / Tablet -->
        <div id="mobile-menu-drawer" class="hidden xl:hidden bg-[#0E0E13] border-t border-[#D4AF37]/25 px-4 pt-3 pb-6 space-y-2">
          <a href="index.html" class="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5" data-i18n="nav_inicio">Inicio</a>
          <a href="el-despacho.html" class="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5" data-i18n="nav_despacho">El Despacho</a>
          <a href="areas-de-practica.html" class="block px-3 py-2 rounded-lg text-[#D4AF37] font-semibold hover:bg-white/5" data-i18n="nav_areas">Áreas de Práctica</a>
          <div class="ps-4 border-s border-[#D4AF37]/30 space-y-1">
            <a href="area-extranjeria.html" class="block px-3 py-1.5 text-sm text-gray-300 hover:text-[#D4AF37]" data-i18n="nav_extranjeria">Extranjería</a>
            <a href="area-derecho-penal.html" class="block px-3 py-1.5 text-sm text-gray-300 hover:text-[#D4AF37]" data-i18n="nav_penal">Derecho Penal</a>
            <a href="area-derecho-de-familia.html" class="block px-3 py-1.5 text-sm text-gray-300 hover:text-[#D4AF37]" data-i18n="nav_familia">Derecho de Familia</a>
            <a href="area-derecho-laboral.html" class="block px-3 py-1.5 text-sm text-gray-300 hover:text-[#D4AF37]" data-i18n="nav_laboral">Derecho Laboral</a>
          </div>
          <a href="preguntas-frecuentes.html" class="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5" data-i18n="nav_faq">Preguntas Frecuentes</a>
          <a href="blog.html" class="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5" data-i18n="nav_blog">Blog</a>
          <a href="contacto.html" class="block px-3 py-2 rounded-lg text-gray-200 hover:bg-white/5" data-i18n="nav_contacto">Contacto</a>
          <a href="textos-legales.html" class="block px-3 py-2 rounded-lg text-gray-400 text-xs hover:bg-white/5" data-i18n="footer_legales">Textos Legales (RGPD / LSSI)</a>
          <div class="pt-2">
            <a href="contacto.html" class="block text-center bg-gold-gradient py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider" data-i18n="nav_cta_cita">Solicitar Consulta</a>
          </div>
        </div>
      </header>
    `;

    const btnToggle = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-menu-drawer');
    if (btnToggle && drawer) {
      btnToggle.addEventListener('click', () => {
        drawer.classList.toggle('hidden');
      });
    }
  }

  // Renderiza el Pie de Página Institucional
  function renderizarFooterCorporativo() {
    const footer = document.getElementById('corporate-footer');
    if (!footer) return;

    footer.innerHTML = `
      <footer class="bg-[#060608] border-t border-[#D4AF37]/25 pt-16 pb-24 md:pb-14 text-sm text-gray-400">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <!-- Columna 1: Identidad Meryem Abogados -->
            <div class="space-y-4">
              <a href="index.html" class="flex items-center gap-3">
                ${obtenerEmblemaSVG('w-11 h-11')}
                <div>
                  <span class="block font-serif-legal text-lg font-bold text-gold-gradient"
                        data-es="MERYEM ABOGADOS"
                        data-ar="مكتب مريم للمحاماة">MERYEM ABOGADOS</span>
                  <span class="block text-[11px] uppercase tracking-widest text-gray-400"
                        data-es="Meryem Oulad"
                        data-ar="المحامية مريم أولاد">Meryem Oulad</span>
                </div>
              </a>
              <p class="text-xs leading-relaxed text-gray-400" data-i18n="footer_lema">
                Despacho jurídico dirigido por la letrada Meryem Oulad. Rigor técnico, trato personal directo y seguimiento exhaustivo de cada expediente en Español y Árabe.
              </p>
              <div class="flex items-center gap-2 text-xs text-[#D4AF37]">
                <span>⚖️</span>
                <span data-es="Idiomas de atención: Español y Árabe (ES | العربية)"
                      data-ar="لغات الخدمة: الإسبانية والعربية (ES | العربية)">
                  Idiomas de atención: Español y Árabe (ES | العربية)
                </span>
              </div>
            </div>

            <!-- Columna 2: Las 4 Especialidades Reales -->
            <div>
              <h3 class="font-serif-legal text-white font-semibold uppercase tracking-wider text-xs mb-4 text-[#D4AF37]" data-i18n="footer_areas">
                Especialidades Jurídicas
              </h3>
              <ul class="space-y-2.5 text-xs">
                <li><a href="area-extranjeria.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_extranjeria">Extranjería</a></li>
                <li><a href="area-derecho-penal.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_penal">Derecho Penal</a></li>
                <li><a href="area-derecho-de-familia.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_familia">Derecho de Familia</a></li>
                <li><a href="area-derecho-laboral.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_laboral">Derecho Laboral</a></li>
                <li><a href="areas-de-practica.html" class="text-[#D4AF37] hover:underline pt-1 inline-block" data-es="Ver todas las áreas →" data-ar="عرض جميع التخصصات ←">Ver todas las áreas →</a></li>
              </ul>
            </div>

            <!-- Columna 3: Enlaces Multipágina -->
            <div>
              <h3 class="font-serif-legal text-white font-semibold uppercase tracking-wider text-xs mb-4 text-[#D4AF37]" data-i18n="footer_navegacion">
                Páginas del Despacho
              </h3>
              <ul class="space-y-2.5 text-xs">
                <li><a href="index.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_inicio">Inicio</a></li>
                <li><a href="el-despacho.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_despacho">El Despacho / Sobre mí</a></li>
                <li><a href="preguntas-frecuentes.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_faq">Preguntas Frecuentes</a></li>
                <li><a href="blog.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_blog">Blog Jurídico</a></li>
                <li><a href="contacto.html" class="hover:text-[#D4AF37] transition" data-i18n="nav_contacto">Contacto y Ubicación SEO</a></li>
                <li><a href="textos-legales.html" class="hover:text-[#D4AF37] transition" data-i18n="footer_legales">Textos Legales (RGPD / LSSI)</a></li>
              </ul>
            </div>

            <!-- Columna 4: Compromiso de Atención < 24h y Entornos -->
            <div class="space-y-3">
              <h3 class="font-serif-legal text-white font-semibold uppercase tracking-wider text-xs mb-4 text-[#D4AF37]" data-i18n="footer_atencion">
                Atención Personalizada
              </h3>
              <div class="p-3.5 rounded-xl bg-[#101015] border border-[#D4AF37]/25 space-y-2">
                <p class="text-xs text-white font-semibold"
                   data-es="Compromiso de Respuesta &lt; 24 Horas"
                   data-ar="التزام بالرد خلال أقل من 24 ساعة">
                  Compromiso de Respuesta &lt; 24 Horas
                </p>
                <p class="text-[11px] text-gray-400 leading-relaxed"
                   data-es="Cada consulta recibida queda registrada automáticamente en el sistema interno de Meryem Abogados con aviso prioritario."
                   data-ar="يتم تسجيل كل استشارة تلقائياً في النظام الداخلي للمكتب مع تنبيه ذي أولوية.">
                  Cada consulta recibida queda registrada automáticamente en el sistema interno de Meryem Abogados con aviso prioritario.
                </p>
                <div class="pt-1 flex flex-wrap gap-2">
                  <a href="captacion.html" class="text-[11px] px-2.5 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 transition"
                     data-es="Landing de Captación →"
                     data-ar="صفحة الاستقطاب المباشر ←">
                    Landing de Captación →
                  </a>
                  <a href="crm.html" class="text-[11px] px-2.5 py-1 rounded bg-white/5 text-gray-300 hover:text-white transition"
                     data-es="Acceso CRM Interno →"
                     data-ar="الدخول إلى نظام CRM الداخلي ←">
                    Acceso CRM Interno →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p data-i18n="footer_derechos">
              © 2026 Meryem Abogados · Dirección Letrada: Meryem Oulad. Todos los derechos reservados.
            </p>
            <div class="flex items-center gap-4">
              <a href="textos-legales.html#aviso-legal" class="hover:text-[#D4AF37] transition"
                 data-es="Aviso Legal" data-ar="الإشعار القانوني">Aviso Legal</a>
              <span>·</span>
              <a href="textos-legales.html#privacidad" class="hover:text-[#D4AF37] transition"
                 data-es="Política de Privacidad (RGPD)" data-ar="سياسة الخصوصية (RGPD)">Política de Privacidad (RGPD)</a>
              <span>·</span>
              <a href="textos-legales.html#cookies" class="hover:text-[#D4AF37] transition"
                 data-es="Política de Cookies (LSSI)" data-ar="سياسة ملفات تعريف الارتباط">Política de Cookies (LSSI)</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Botones Flotantes de WhatsApp y Llamada Directa
  function renderizarBotonesFlotantes() {
    const archivo = obtenerArchivoActual();
    if (archivo === 'crm.html') return;

    const wrapper = document.createElement('div');
    wrapper.id = 'floating-contact-widgets';
    wrapper.className = 'fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3';
    wrapper.innerHTML = `
      <button type="button" data-track-action="clic_telefono" data-track-label="Botón Flotante Llamada"
              class="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#101014] border border-[#D4AF37] text-white shadow-2xl hover:bg-[#D4AF37] hover:text-[#08080A] transition-all duration-300">
        <span class="w-8 h-8 rounded-full bg-[#D4AF37]/20 group-hover:bg-[#08080A]/20 flex items-center justify-center text-base">
          📞
        </span>
        <span class="text-xs font-bold uppercase tracking-wider pr-1" data-i18n="float_llamar">Llamada Directa</span>
      </button>

      <button type="button" data-track-action="clic_whatsapp" data-track-label="Botón Flotante WhatsApp"
              class="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl border border-emerald-400/40 transition-all duration-300 pulse-gold">
        <span class="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-base">
          💬
        </span>
        <span class="text-xs font-bold uppercase tracking-wider pr-1" data-i18n="float_whatsapp">WhatsApp Directo</span>
      </button>
    `;
    document.body.appendChild(wrapper);
  }

  // Sistema de Notificaciones Toast Bilingües
  function mostrarToast(titulo, subtitulo = '', enlaceCRM = false) {
    let container = document.getElementById('meryem-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'meryem-toast-container';
      container.className = 'fixed top-16 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none';
      document.body.appendChild(container);
    }

    const esAr = obtenerIdiomaActual() === 'ar';
    const textoEnlace = esAr ? 'عرض الملف في نظام CRM الداخلي ←' : 'Ver expediente en el CRM Interno →';

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto luxury-glass border-gold-glow rounded-xl p-4 shadow-2xl text-sm page-enter';
    toast.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-start gap-2.5">
          <span class="text-[#D4AF37] text-lg leading-none mt-0.5">⚖️</span>
          <div>
            <p class="font-semibold text-white">${titulo}</p>
            ${subtitulo ? `<p class="text-xs text-gray-300 mt-1 leading-relaxed">${subtitulo}</p>` : ''}
            ${
              enlaceCRM
                ? `<a href="crm.html" class="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#D4AF37] hover:underline">
                     ${textoEnlace}
                   </a>`
                : ''
            }
          </div>
        </div>
        <button type="button" class="text-gray-400 hover:text-white text-xs">✕</button>
      </div>
    `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 6500);
  }

  // Conecta todos los botones con atributo [data-track-action] a la analítica en tiempo real del CRM
  function inicializarTrackingBotones() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-track-action]');
      if (!btn || !window.MeryemCRM) return;

      const tipoEvento = btn.getAttribute('data-track-action');
      const etiqueta = btn.getAttribute('data-track-label') || 'Acción directa';
      const archivo = obtenerArchivoActual();
      const info = MAPA_PAGINAS[archivo] || MAPA_PAGINAS['index.html'];
      const esAr = obtenerIdiomaActual() === 'ar';

      window.MeryemCRM.registrarEvento(tipoEvento, info.entorno, info.ruta, etiqueta);
      actualizarContadoresTopbar();

      const config = window.MeryemCRM.obtenerConfiguracion();
      const telLimpio = (config.telefono_configurable || '').replace(/[^\d+]/g, '');

      if (tipoEvento === 'clic_whatsapp') {
        mostrarToast(
          esAr ? 'تم تسجيل نقرة واتساب في النظام (+1)' : 'Clic en WhatsApp registrado en CRM (+1)',
          esAr
            ? 'تم تحديث عداد الإحصائيات الفورية في لوحة تحكم المكتب.'
            : 'El contador de analítica en tiempo real se ha actualizado en el panel del despacho.',
          true
        );
        if (telLimpio) {
          const texto = encodeURIComponent(
            esAr
              ? 'مرحباً مكتب مريم للمحاماة، أود طلب استشارة قانونية.'
              : 'Hola Meryem Abogados, deseo realizar una consulta jurídica.'
          );
          window.open(`https://wa.me/${telLimpio.replace('+', '')}?text=${texto}`, '_blank', 'noopener');
        }
      } else if (tipoEvento === 'clic_telefono') {
        mostrarToast(
          esAr ? 'تم تسجيل نقرة اتصال هاتفي في النظام (+1)' : 'Clic en Llamada Telefónica registrado en CRM (+1)',
          esAr
            ? 'تم تحديث عداد المكالمات الفورية في لوحة تحكم المكتب.'
            : 'El contador de llamadas en tiempo real se ha actualizado en el panel del despacho.',
          true
        );
        if (telLimpio) {
          window.location.href = `tel:${telLimpio}`;
        }
      }
    });
  }

  // Conecta automáticamente cualquier formulario con [data-crm-form] al almacenamiento del CRM
  function inicializarFormulariosCRM() {
    document.querySelectorAll('form[data-crm-form]').forEach((form) => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!window.MeryemCRM) return;

        const formData = new FormData(form);
        const origenDefault = form.getAttribute('data-crm-origen') || 'Web Corporativa';
        const areaDefault = form.getAttribute('data-crm-area') || 'Extranjería';

        const nombre = (formData.get('nombre_completo') || '').toString().trim();
        const telefono = (formData.get('telefono') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const area = (formData.get('area_practica') || areaDefault).toString().trim();
        const origen = (formData.get('origen') || origenDefault).toString().trim();
        const mensaje = (formData.get('mensaje') || '').toString().trim();
        const esAr = obtenerIdiomaActual() === 'ar';

        if (!nombre || !telefono) {
          mostrarToast(
            esAr ? 'بيانات غير مكتملة' : 'Datos incompletos',
            esAr ? 'يرجى إدخال الاسم الكامل ورقم الهاتف.' : 'Por favor, indique su nombre y teléfono de contacto.'
          );
          return;
        }

        const nueva = window.MeryemCRM.crearConsulta({
          nombre_completo: nombre,
          telefono: telefono,
          email: email,
          area_practica: area,
          origen: origen,
          estado: 'Consulta nueva',
          mensaje: mensaje,
          idioma_preferido: obtenerIdiomaActual()
        });

        form.reset();
        actualizarContadoresTopbar();

        const feedbackBox = form.querySelector('[data-crm-feedback]') || form.parentElement.querySelector('[data-crm-feedback]');
        if (feedbackBox) {
          feedbackBox.classList.remove('hidden');
          feedbackBox.innerHTML = esAr
            ? `
              <div class="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 text-xs space-y-2 mt-4">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-emerald-300 text-sm">✓ تم تسجيل الاستشارة: ${nueva.codigo_expediente}</span>
                  <span class="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFF5C0] font-semibold">تنبيه &lt; 24 ساعة مفعل</span>
                </div>
                <p>تم تسجيل طلبكم في تخصص <strong>${DICCIONARIO_FRASES_AR[nueva.area_practica] || nueva.area_practica}</strong> تلقائياً في نظام <strong>مكتب مريم للمحاماة</strong>. ستقوم المحامية <strong>مريم أولاد</strong> بمراجعة ملفكم خلال أقل من 24 ساعة.</p>
                <div class="pt-1">
                  <a href="crm.html" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#08080A] font-bold hover:opacity-95 transition">
                    فتح هذا الملف في نظام CRM الداخلي ←
                  </a>
                </div>
              </div>
            `
            : `
              <div class="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 text-xs space-y-2 mt-4">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-emerald-300 text-sm">✓ Consulta registrada: ${nueva.codigo_expediente}</span>
                  <span class="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFF5C0] font-semibold">Alerta &lt; 24h activada</span>
                </div>
                <p>Su solicitud de <strong>${nueva.area_practica}</strong> ha quedado registrada automáticamente en el CRM de <strong>Meryem Abogados</strong>. La letrada <strong>Meryem Oulad</strong> revisará su expediente en menos de 24 horas.</p>
                <div class="pt-1">
                  <a href="crm.html" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#08080A] font-bold hover:opacity-95 transition">
                    Abrir este expediente en el CRM Interno →
                  </a>
                </div>
              </div>
            `;
        }

        mostrarToast(
          esAr ? `تم تسجيل استشارة جديدة (${nueva.codigo_expediente})` : `Nueva consulta registrada (${nueva.codigo_expediente})`,
          esAr
            ? `${nueva.nombre_completo} · تم تفعيل تنبيه الرد خلال أقل من 24 ساعة.`
            : `${nueva.nombre_completo} · ${nueva.area_practica}. Se ha activado el recordatorio automático < 24h.`,
          true
        );
      });
    });
  }

  function actualizarContadoresTopbar() {
    if (!window.MeryemCRM) return;
    const m = window.MeryemCRM.obtenerMetricas();
    const waEl = document.getElementById('topbar-wa-count');
    const telEl = document.getElementById('topbar-tel-count');
    const alEl = document.getElementById('topbar-badge-alertas');

    if (waEl) waEl.textContent = m.clics_whatsapp;
    if (telEl) telEl.textContent = m.clics_telefono;
    if (alEl) alEl.innerHTML = `${m.alertas_24h_pendientes} &lt;24h`;
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderizarBarraEntornos();
    renderizarCabeceraCorporativa();
    renderizarFooterCorporativo();
    renderizarBotonesFlotantes();
    inicializarTrackingBotones();
    inicializarFormulariosCRM();
    aplicarIdiomaDOM(obtenerIdiomaActual());

    if (window.MeryemCRM) {
      window.MeryemCRM.suscribir(() => {
        actualizarContadoresTopbar();
      });
    }
  });

  window.MeryemLayout = {
    obtenerEmblemaSVG,
    mostrarToast,
    cambiarIdioma,
    obtenerIdiomaActual,
    aplicarIdiomaDOM,
    actualizarContadoresTopbar,
    DICCIONARIO_FRASES_AR
  };
})(window, document);
