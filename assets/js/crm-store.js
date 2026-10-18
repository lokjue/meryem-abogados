/**
 * ============================================================================
 * MERYEM ABOGADOS - MOTOR DE DATOS CRM Y ANALÍTICA EN TIEMPO REAL (100% JS)
 * Dirección Letrada: Meryem Oulad
 * Sincronización instantánea entre todas las páginas HTML vía LocalStorage + BroadcastChannel
 * ============================================================================
 */

(function (window) {
  'use strict';

  const STORAGE_KEY = 'meryem_abogados_crm_store_v2';
  const CHANNEL_NAME = 'meryem_abogados_live_sync';

  const AREAS_VALIDAS = [
    'Extranjería',
    'Derecho Penal',
    'Derecho de Familia',
    'Derecho Laboral'
  ];

  const ORIGENES_VALIDOS = [
    'Web Corporativa',
    'Landing de Captación',
    'Contacto Telefónico Directo',
    'Recomendación',
    'Ficha de Google'
  ];

  const ESTADOS_KANBAN = [
    'Consulta nueva',
    'Contactado',
    'Cita agendada',
    'Presupuesto enviado',
    'Cliente',
    'Archivado'
  ];

  // 5 Plantillas Oficiales de Respuesta Rápida por Correo y WhatsApp
  const PLANTILLAS_OFICIALES = [
    {
      id: 1,
      clave: 'recepcion_24h',
      titulo: '1. Recepción de consulta y primer contacto (< 24h)',
      area_sugerida: 'General',
      asunto_email: 'Meryem Abogados | Recepción de su consulta sobre {area} ({expediente})',
      cuerpo_mensaje:
        'Estimado/a {nombre},\n\nLe escribimos desde el despacho Meryem Abogados en relación con su consulta sobre {area} (Ref. {expediente}).\n\nLa letrada Meryem Oulad ha revisado personalmente su solicitud. Para ofrecerle una valoración jurídica rigurosa y analizar su situación en detalle, indíquenos por favor qué franja horaria le resulta más cómoda hoy o mañana para mantener una primera conversación o agendar cita en el despacho.\n\nQuedamos a su entera disposición.\n\nAtentamente,\nMeryem Oulad\nMeryem Abogados'
    },
    {
      id: 2,
      clave: 'cita_extranjeria',
      titulo: '2. Agendamiento y documentación para trámite de Extranjería',
      area_sugerida: 'Extranjería',
      asunto_email: 'Meryem Abogados | Confirmación de cita y documentación - {area} ({expediente})',
      cuerpo_mensaje:
        'Estimado/a {nombre},\n\nDesde Meryem Abogados le confirmamos el seguimiento de su expediente de {area} ({expediente}).\n\nPara aprovechar al máximo nuestra cita de estudio con la letrada Meryem Oulad, le recomendamos traer o remitir previamente copia de:\n- Pasaporte completo o NIE en vigor.\n- Volante o certificado de empadronamiento actualizado.\n- Cualquier resolución, requerimiento o notificación administrativa previa.\n\nPor favor, responda a este mensaje para confirmar su disponibilidad.\n\nUn cordial saludo,\nMeryem Oulad\nMeryem Abogados'
    },
    {
      id: 3,
      clave: 'urgencia_penal',
      titulo: '3. Atención prioritaria en Derecho Penal / Citación Judicial',
      area_sugerida: 'Derecho Penal',
      asunto_email: 'URGENTE | Meryem Abogados - Asistencia jurídica en {area} ({expediente})',
      cuerpo_mensaje:
        'Estimado/a {nombre},\n\nHemos recibido su solicitud de asistencia en materia de {area} ({expediente}). En Meryem Abogados damos prioridad absoluta a las citaciones judiciales y procedimientos penales en curso.\n\nEs fundamental revisar cuanto antes la citación, atestado o notificación recibida para preparar su estrategia de defensa con plenas garantías. Puede responder directamente por esta vía o llamarnos para coordinar la intervención inmediata de la letrada Meryem Oulad.\n\nAtentamente,\nMeryem Oulad\nMeryem Abogados'
    },
    {
      id: 4,
      clave: 'orientacion_familia',
      titulo: '4. Primera sesión de estudio en Derecho de Familia',
      area_sugerida: 'Derecho de Familia',
      asunto_email: 'Meryem Abogados | Estudio confidencial de su caso de {area} ({expediente})',
      cuerpo_mensaje:
        'Estimado/a {nombre},\n\nGracias por confiar en Meryem Abogados para su consulta de {area} ({expediente}). Sabemos que los procesos familiares requieren cercanía, absoluta confidencialidad y seguridad jurídica.\n\nLa letrada Meryem Oulad está a su disposición para concertar una cita donde analizar su situación particular (convenio regulador, medidas paterno-filiales o procedimiento de familia) y explicarle con claridad cada paso legal.\n\n¿Qué día y hora le vendría mejor para nuestra reunión?\n\nUn cordial saludo,\nMeryem Oulad\nMeryem Abogados'
    },
    {
      id: 5,
      clave: 'seguimiento_presupuesto',
      titulo: '5. Envío y seguimiento de propuesta / Hoja de encargo ({area})',
      area_sugerida: 'Derecho Laboral',
      asunto_email: 'Meryem Abogados | Propuesta de actuación profesional en {area} ({expediente})',
      cuerpo_mensaje:
        'Estimado/a {nombre},\n\nEsperamos que se encuentre bien. Tras analizar los detalles de su caso de {area} ({expediente}), desde Meryem Abogados le contactamos para conocer si ha podido revisar la propuesta de actuación jurídica y hoja de encargo remitida por la letrada Meryem Oulad.\n\nRecuerde que en determinadas actuaciones existen plazos procesales estrictos que conviene asegurar cuanto antes. Quedamos atentos a cualquier duda que desee resolver para iniciar los trámites.\n\nAtentamente,\nMeryem Oulad\nMeryem Abogados'
    }
  ];

  function isoOffset(hoursOffset) {
    const d = new Date(Date.now() + hoursOffset * 3600 * 1000);
    return d.toISOString();
  }

  function generarEstadoInicial() {
    return {
      configuracion: {
        marca: 'Meryem Abogados',
        titular: 'Meryem Oulad',
        email_despacho: 'contacto@meryemabogados.com',
        telefono_configurable: '' // Configurable por la letrada en el CRM (sin inventar números falsos)
      },
      plantillas: PLANTILLAS_OFICIALES,
      consultas: [
        {
          id: 1,
          codigo_expediente: 'EXP-2026-001',
          nombre_completo: 'Karim Benali',
          telefono: 'Contacto registrado en ficha',
          email: 'karim.benali@cliente.es',
          area_practica: 'Extranjería',
          origen: 'Landing de Captación',
          estado: 'Consulta nueva',
          mensaje: 'Necesito asesoramiento para presentar arraigo social y revisar un requerimiento de subsanación administrativa recibido esta semana.',
          idioma_preferido: 'es',
          prioridad_24h: true,
          fecha_creacion: isoOffset(-3),
          fecha_primer_contacto: null,
          notas: [
            {
              id: 101,
              autor: 'Sistema CRM · Meryem Abogados',
              contenido: 'Entrada automática desde Landing de Captación. Revisar plazo de 10 días hábiles del requerimiento de Extranjería.',
              fecha_creacion: isoOffset(-3)
            }
          ],
          recordatorios: [
            {
              id: 201,
              titulo: 'Garantía < 24h: Contactar a Karim Benali y revisar plazo del requerimiento',
              fecha_limite: isoOffset(21),
              completado: false,
              es_alerta_24h: true
            }
          ]
        },
        {
          id: 2,
          codigo_expediente: 'EXP-2026-002',
          nombre_completo: 'Elena Martínez Gómez',
          telefono: 'Contacto registrado en ficha',
          email: 'elena.martinez@cliente.es',
          area_practica: 'Derecho de Familia',
          origen: 'Web Corporativa',
          estado: 'Contactado',
          mensaje: 'Consulta sobre divorcio de mutuo acuerdo con dos menores y redacción de convenio regulador con guarda y custodia compartida.',
          idioma_preferido: 'es',
          prioridad_24h: false,
          fecha_creacion: isoOffset(-42),
          fecha_primer_contacto: isoOffset(-36),
          notas: [
            {
              id: 102,
              autor: 'Meryem Oulad',
              contenido: 'Llamada inicial realizada en menos de 24h. La cliente prefiere vía de mutuo acuerdo. Pendiente de confirmar hora para cita en el despacho.',
              fecha_creacion: isoOffset(-36)
            }
          ],
          recordatorios: [
            {
              id: 202,
              titulo: 'Confirmar día y hora de cita de estudio con Elena Martínez',
              fecha_limite: isoOffset(14),
              completado: false,
              es_alerta_24h: true
            }
          ]
        },
        {
          id: 3,
          codigo_expediente: 'EXP-2026-003',
          nombre_completo: 'Youssef El Amrani',
          telefono: 'Contacto registrado en ficha',
          email: 'youssef.amrani@cliente.es',
          area_practica: 'Derecho Penal',
          origen: 'Recomendación',
          estado: 'Cita agendada',
          mensaje: 'Acude por recomendación de un cliente del despacho. Ha recibido citación para declarar en juzgado de instrucción y solicita asistencia letrada.',
          idioma_preferido: 'ar',
          prioridad_24h: false,
          fecha_creacion: isoOffset(-90),
          fecha_primer_contacto: isoOffset(-85),
          notas: [
            {
              id: 103,
              autor: 'Meryem Oulad',
              contenido: 'Atención bilingüe en árabe y español. Cita agendada en el despacho para revisar copia de la citación judicial y preparar defensa.',
              fecha_creacion: isoOffset(-72)
            }
          ],
          recordatorios: [
            {
              id: 203,
              titulo: 'Preparar análisis de diligencias previas para la cita de Youssef El Amrani',
              fecha_limite: isoOffset(18),
              completado: false,
              es_alerta_24h: false
            }
          ]
        },
        {
          id: 4,
          codigo_expediente: 'EXP-2026-004',
          nombre_completo: 'Carlos Ruiz Navarro',
          telefono: 'Contacto registrado en ficha',
          email: 'carlos.ruiz@cliente.es',
          area_practica: 'Derecho Laboral',
          origen: 'Ficha de Google',
          estado: 'Presupuesto enviado',
          mensaje: 'Despido disciplinario notificado hace 5 días. Solicita revisión de carta de despido, cálculo de finiquito e indemnización y presentación de papeleta SMAC.',
          idioma_preferido: 'es',
          prioridad_24h: false,
          fecha_creacion: isoOffset(-115),
          fecha_primer_contacto: isoOffset(-108),
          notas: [
            {
              id: 104,
              autor: 'Meryem Oulad',
              contenido: 'Plazo de 20 días hábiles activo. Propuesta de hoja de encargo remitida por correo electrónico y WhatsApp.',
              fecha_creacion: isoOffset(-48)
            }
          ],
          recordatorios: [
            {
              id: 204,
              titulo: 'Seguimiento de hoja de encargo antes de presentar papeleta de conciliación',
              fecha_limite: isoOffset(10),
              completado: false,
              es_alerta_24h: true
            }
          ]
        },
        {
          id: 5,
          codigo_expediente: 'EXP-2026-005',
          nombre_completo: 'Nadia Haddad',
          telefono: 'Contacto registrado en ficha',
          email: 'nadia.haddad@cliente.es',
          area_practica: 'Extranjería',
          origen: 'Contacto Telefónico Directo',
          estado: 'Cliente',
          mensaje: 'Expediente de nacionalidad española por residencia y reagrupación familiar. Hoja de encargo firmada y documentación completa en trámite.',
          idioma_preferido: 'ar',
          prioridad_24h: false,
          fecha_creacion: isoOffset(-200),
          fecha_primer_contacto: isoOffset(-198),
          notas: [
            {
              id: 105,
              autor: 'Meryem Oulad',
              contenido: 'Documentación verificada y expediente presentado telemáticamente. Cliente informada del número de registro.',
              fecha_creacion: isoOffset(-24)
            }
          ],
          recordatorios: [
            {
              id: 205,
              titulo: 'Primer contacto en < 24h completado',
              fecha_limite: isoOffset(-180),
              completado: true,
              es_alerta_24h: true
            }
          ]
        },
        {
          id: 6,
          codigo_expediente: 'EXP-2026-006',
          nombre_completo: 'Javier Morales Soto',
          telefono: 'Contacto registrado en ficha',
          email: 'javier.morales@cliente.es',
          area_practica: 'Derecho Laboral',
          origen: 'Web Corporativa',
          estado: 'Archivado',
          mensaje: 'Consulta sobre modificación sustancial de condiciones de trabajo. Se resolvió mediante acuerdo interno en la empresa tras orientación inicial.',
          idioma_preferido: 'es',
          prioridad_24h: false,
          fecha_creacion: isoOffset(-320),
          fecha_primer_contacto: isoOffset(-312),
          notas: [
            {
              id: 106,
              autor: 'Meryem Oulad',
              contenido: 'Consulta finalizada. El cliente agradece la orientación y queda archivado para futuras necesidades.',
              fecha_creacion: isoOffset(-280)
            }
          ],
          recordatorios: []
        }
      ],
      eventos: [
        { id: 1, tipo_evento: 'clic_whatsapp', entorno: 'web_corporativa', ruta_pagina: 'index.html', fecha_evento: isoOffset(-96) },
        { id: 2, tipo_evento: 'clic_whatsapp', entorno: 'web_corporativa', ruta_pagina: 'area-extranjeria.html', fecha_evento: isoOffset(-72) },
        { id: 3, tipo_evento: 'clic_whatsapp', entorno: 'landing_captacion', ruta_pagina: 'captacion.html', fecha_evento: isoOffset(-30) },
        { id: 4, tipo_evento: 'clic_whatsapp', entorno: 'web_corporativa', ruta_pagina: 'contacto.html', fecha_evento: isoOffset(-12) },
        { id: 5, tipo_evento: 'clic_telefono', entorno: 'web_corporativa', ruta_pagina: 'index.html', fecha_evento: isoOffset(-80) },
        { id: 6, tipo_evento: 'clic_telefono', entorno: 'landing_captacion', ruta_pagina: 'captacion.html', fecha_evento: isoOffset(-24) },
        { id: 7, tipo_evento: 'clic_telefono', entorno: 'web_corporativa', ruta_pagina: 'area-derecho-penal.html', fecha_evento: isoOffset(-6) },
        { id: 8, tipo_evento: 'envio_formulario_web', entorno: 'web_corporativa', ruta_pagina: 'contacto.html', fecha_evento: isoOffset(-42) },
        { id: 9, tipo_evento: 'envio_formulario_landing', entorno: 'landing_captacion', ruta_pagina: 'captacion.html', fecha_evento: isoOffset(-3) }
      ]
    };
  }

  let syncChannel = null;
  try {
    if ('BroadcastChannel' in window) {
      syncChannel = new BroadcastChannel(CHANNEL_NAME);
    }
  } catch (err) {
    syncChannel = null;
  }

  const suscriptores = [];

  function leerStore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const inicial = generarEstadoInicial();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
        return inicial;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.consultas)) {
        const inicial = generarEstadoInicial();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
        return inicial;
      }
      if (!Array.isArray(parsed.plantillas) || parsed.plantillas.length < 5) {
        parsed.plantillas = PLANTILLAS_OFICIALES;
      }
      return parsed;
    } catch (e) {
      return generarEstadoInicial();
    }
  }

  function guardarStore(store, motivo = 'update') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      if (syncChannel) {
        syncChannel.postMessage({ motivo, timestamp: Date.now() });
      }
      notificarSuscriptores(motivo);
    } catch (e) {
      console.error('Error guardando en almacenamiento local del CRM:', e);
    }
  }

  function notificarSuscriptores(motivo) {
    const storeActual = leerStore();
    suscriptores.forEach((fn) => {
      try {
        fn(storeActual, motivo);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (syncChannel) {
    syncChannel.onmessage = function (ev) {
      notificarSuscriptores(ev.data ? ev.data.motivo : 'remote_sync');
    };
  }

  window.addEventListener('storage', function (ev) {
    if (ev.key === STORAGE_KEY) {
      notificarSuscriptores('storage_event');
    }
  });

  // ==========================================================================
  // API PÚBLICA DE MERYEM CRM
  // ==========================================================================
  const MeryemCRM = {
    AREAS_VALIDAS,
    ORIGENES_VALIDOS,
    ESTADOS_KANBAN,

    suscribir(callback) {
      if (typeof callback === 'function') {
        suscriptores.push(callback);
      }
    },

    obtenerConfiguracion() {
      const store = leerStore();
      return store.configuracion || {
        marca: 'Meryem Abogados',
        titular: 'Meryem Oulad',
        email_despacho: 'contacto@meryemabogados.com',
        telefono_configurable: ''
      };
    },

    guardarConfiguracion(nuevaConfig) {
      const store = leerStore();
      store.configuracion = Object.assign({}, store.configuracion || {}, nuevaConfig);
      guardarStore(store, 'configuracion_actualizada');
      return store.configuracion;
    },

    obtenerPlantillas() {
      const store = leerStore();
      return store.plantillas || PLANTILLAS_OFICIALES;
    },

    obtenerConsultas(filtros = {}) {
      const store = leerStore();
      let lista = [...store.consultas];

      if (filtros.estado && ESTADOS_KANBAN.includes(filtros.estado)) {
        lista = lista.filter((c) => c.estado === filtros.estado);
      }
      if (filtros.area_practica && AREAS_VALIDAS.includes(filtros.area_practica)) {
        lista = lista.filter((c) => c.area_practica === filtros.area_practica);
      }
      if (filtros.origen && ORIGENES_VALIDOS.includes(filtros.origen)) {
        lista = lista.filter((c) => c.origen === filtros.origen);
      }
      if (filtros.solo_alertas_24h) {
        lista = lista.filter((c) =>
          c.prioridad_24h || (c.recordatorios && c.recordatorios.some((r) => !r.completado))
        );
      }
      if (filtros.q && filtros.q.trim() !== '') {
        const q = filtros.q.trim().toLowerCase();
        lista = lista.filter((c) =>
          (c.nombre_completo || '').toLowerCase().includes(q) ||
          (c.telefono || '').toLowerCase().includes(q) ||
          (c.email || '').toLowerCase().includes(q) ||
          (c.codigo_expediente || '').toLowerCase().includes(q) ||
          (c.mensaje || '').toLowerCase().includes(q)
        );
      }

      lista.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
      return lista;
    },

    obtenerConsultaPorId(id) {
      const store = leerStore();
      return store.consultas.find((c) => Number(c.id) === Number(id)) || null;
    },

    crearConsulta(datos) {
      const store = leerStore();
      const maxId = store.consultas.reduce((max, c) => Math.max(max, Number(c.id) || 0), 0);
      const nuevoId = maxId + 1;
      const anio = new Date().getFullYear();
      const codigo = `EXP-${anio}-${String(nuevoId).padStart(3, '0')}`;

      const area = AREAS_VALIDAS.includes(datos.area_practica) ? datos.area_practica : 'Extranjería';
      const origen = ORIGENES_VALIDOS.includes(datos.origen) ? datos.origen : 'Web Corporativa';
      const estado = ESTADOS_KANBAN.includes(datos.estado) ? datos.estado : 'Consulta nueva';
      const ahora = new Date().toISOString();
      const limite24h = new Date(Date.now() + 24 * 3600 * 1000).toISOString();

      const nuevaConsulta = {
        id: nuevoId,
        codigo_expediente: codigo,
        nombre_completo: (datos.nombre_completo || '').trim() || 'Visitante Web',
        telefono: (datos.telefono || '').trim() || 'Pendiente de confirmar',
        email: (datos.email || '').trim(),
        area_practica: area,
        origen: origen,
        estado: estado,
        mensaje: (datos.mensaje || '').trim() || `Solicitud de consulta jurídica en el área de ${area}.`,
        idioma_preferido: datos.idioma_preferido === 'ar' ? 'ar' : 'es',
        prioridad_24h: estado === 'Consulta nueva',
        fecha_creacion: ahora,
        fecha_primer_contacto: estado !== 'Consulta nueva' ? ahora : null,
        notas: [
          {
            id: Date.now(),
            autor: 'Sistema CRM · Meryem Abogados',
            contenido: `Expediente ${codigo} registrado automáticamente desde '${origen}' (Especialidad: ${area}).`,
            fecha_creacion: ahora
          }
        ],
        recordatorios: [
          {
            id: Date.now() + 1,
            titulo: `Garantía < 24h: Contactar a ${(datos.nombre_completo || '').trim()} (${area}) y ofrecer primera valoración`,
            fecha_limite: limite24h,
            completado: estado !== 'Consulta nueva',
            es_alerta_24h: true
          }
        ]
      };

      store.consultas.unshift(nuevaConsulta);

      // Registrar evento analítico según origen
      if (origen === 'Landing de Captación') {
        store.eventos.push({
          id: Date.now() + 2,
          tipo_evento: 'envio_formulario_landing',
          entorno: 'landing_captacion',
          ruta_pagina: 'captacion.html',
          metadatos: codigo,
          fecha_evento: ahora
        });
      } else if (origen === 'Web Corporativa') {
        store.eventos.push({
          id: Date.now() + 2,
          tipo_evento: 'envio_formulario_web',
          entorno: 'web_corporativa',
          ruta_pagina: window.location.pathname.split('/').pop() || 'contacto.html',
          metadatos: codigo,
          fecha_evento: ahora
        });
      }

      guardarStore(store, 'nueva_consulta');
      return nuevaConsulta;
    },

    cambiarEstado(consultaId, nuevoEstado) {
      if (!ESTADOS_KANBAN.includes(nuevoEstado)) return null;
      const store = leerStore();
      const idx = store.consultas.findIndex((c) => Number(c.id) === Number(consultaId));
      if (idx === -1) return null;

      const c = store.consultas[idx];
      const estadoAnterior = c.estado;
      c.estado = nuevoEstado;
      c.prioridad_24h = nuevoEstado === 'Consulta nueva';

      if (nuevoEstado !== 'Consulta nueva' && !c.fecha_primer_contacto) {
        c.fecha_primer_contacto = new Date().toISOString();
      }

      if (nuevoEstado !== 'Consulta nueva' && Array.isArray(c.recordatorios)) {
        c.recordatorios.forEach((r) => {
          if (r.es_alerta_24h) r.completado = true;
        });
      }

      if (estadoAnterior !== nuevoEstado) {
        c.notas = c.notas || [];
        c.notas.unshift({
          id: Date.now(),
          autor: 'Meryem Oulad',
          contenido: `Cambio de estado en el embudo: '${estadoAnterior}' → '${nuevoEstado}'.`,
          fecha_creacion: new Date().toISOString()
        });
      }

      guardarStore(store, 'cambio_estado');
      return c;
    },

    actualizarConsulta(consultaId, cambios) {
      const store = leerStore();
      const idx = store.consultas.findIndex((c) => Number(c.id) === Number(consultaId));
      if (idx === -1) return null;

      const c = store.consultas[idx];
      if (typeof cambios.nombre_completo === 'string' && cambios.nombre_completo.trim()) {
        c.nombre_completo = cambios.nombre_completo.trim();
      }
      if (typeof cambios.telefono === 'string' && cambios.telefono.trim()) {
        c.telefono = cambios.telefono.trim();
      }
      if (typeof cambios.email === 'string') {
        c.email = cambios.email.trim();
      }
      if (cambios.area_practica && AREAS_VALIDAS.includes(cambios.area_practica)) {
        c.area_practica = cambios.area_practica;
      }
      if (cambios.origen && ORIGENES_VALIDOS.includes(cambios.origen)) {
        c.origen = cambios.origen;
      }
      if (cambios.estado && ESTADOS_KANBAN.includes(cambios.estado)) {
        c.estado = cambios.estado;
        c.prioridad_24h = cambios.estado === 'Consulta nueva';
      }
      if (typeof cambios.mensaje === 'string') {
        c.mensaje = cambios.mensaje.trim();
      }

      guardarStore(store, 'consulta_actualizada');
      return c;
    },

    eliminarConsulta(consultaId) {
      const store = leerStore();
      store.consultas = store.consultas.filter((c) => Number(c.id) !== Number(consultaId));
      guardarStore(store, 'consulta_eliminada');
      return true;
    },

    agregarNota(consultaId, contenido, autor = 'Meryem Oulad') {
      if (!contenido || !contenido.trim()) return null;
      const store = leerStore();
      const c = store.consultas.find((item) => Number(item.id) === Number(consultaId));
      if (!c) return null;

      c.notas = c.notas || [];
      const nuevaNota = {
        id: Date.now(),
        autor: (autor || 'Meryem Oulad').trim(),
        contenido: contenido.trim(),
        fecha_creacion: new Date().toISOString()
      };
      c.notas.unshift(nuevaNota);
      guardarStore(store, 'nota_agregada');
      return nuevaNota;
    },

    agregarRecordatorio(consultaId, titulo, horasPlazo = 24) {
      if (!titulo || !titulo.trim()) return null;
      const store = leerStore();
      const c = store.consultas.find((item) => Number(item.id) === Number(consultaId));
      if (!c) return null;

      const horas = Number(horasPlazo) > 0 ? Number(horasPlazo) : 24;
      const fechaLimite = new Date(Date.now() + horas * 3600 * 1000).toISOString();

      c.recordatorios = c.recordatorios || [];
      const nuevoRec = {
        id: Date.now(),
        titulo: titulo.trim(),
        fecha_limite: fechaLimite,
        completado: false,
        es_alerta_24h: horas <= 24
      };
      c.recordatorios.unshift(nuevoRec);
      guardarStore(store, 'recordatorio_agregado');
      return nuevoRec;
    },

    toggleRecordatorio(consultaId, recordatorioId) {
      const store = leerStore();
      const c = store.consultas.find((item) => Number(item.id) === Number(consultaId));
      if (!c || !Array.isArray(c.recordatorios)) return null;

      const rec = c.recordatorios.find((r) => Number(r.id) === Number(recordatorioId));
      if (!rec) return null;

      rec.completado = !rec.completado;
      guardarStore(store, 'recordatorio_toggle');
      return rec;
    },

    registrarEvento(tipoEvento, entorno = 'web_corporativa', rutaPagina = '', metadatos = '') {
      const store = leerStore();
      store.eventos = store.eventos || [];
      const ev = {
        id: Date.now(),
        tipo_evento: tipoEvento,
        entorno: entorno,
        ruta_pagina: rutaPagina || window.location.pathname.split('/').pop() || 'index.html',
        metadatos: metadatos,
        fecha_evento: new Date().toISOString()
      };
      store.eventos.push(ev);
      guardarStore(store, 'evento_analitica');
      return ev;
    },

    obtenerMetricas() {
      const store = leerStore();
      const consultas = store.consultas || [];
      const eventos = store.eventos || [];

      const hace30Dias = Date.now() - 30 * 24 * 3600 * 1000;
      const consultasMes = consultas.filter((c) => new Date(c.fecha_creacion).getTime() >= hace30Dias);
      const totalMes = consultasMes.length > 0 ? consultasMes.length : consultas.length;
      const totalGlobal = consultas.length;

      const conCita = consultas.filter((c) =>
        ['Cita agendada', 'Presupuesto enviado', 'Cliente'].includes(c.estado)
      ).length;

      const clientesActivos = consultas.filter((c) => c.estado === 'Cliente').length;
      const pendientesNuevas = consultas.filter((c) => c.estado === 'Consulta nueva').length;

      const porcentajeCita = totalGlobal > 0 ? Number(((conCita / totalGlobal) * 100).toFixed(1)) : 0;

      const desgloseOrigen = {};
      ORIGENES_VALIDOS.forEach((o) => { desgloseOrigen[o] = 0; });
      consultas.forEach((c) => {
        if (desgloseOrigen[c.origen] !== undefined) {
          desgloseOrigen[c.origen]++;
        } else {
          desgloseOrigen[c.origen] = 1;
        }
      });

      const desgloseAreas = {};
      AREAS_VALIDAS.forEach((a) => { desgloseAreas[a] = 0; });
      consultas.forEach((c) => {
        if (desgloseAreas[c.area_practica] !== undefined) {
          desgloseAreas[c.area_practica]++;
        }
      });

      const clicsWhatsapp = eventos.filter((e) => e.tipo_evento === 'clic_whatsapp').length;
      const clicsTelefono = eventos.filter((e) => e.tipo_evento === 'clic_telefono').length;
      const enviosWeb = eventos.filter((e) => e.tipo_evento === 'envio_formulario_web').length;
      const enviosLanding = eventos.filter((e) => e.tipo_evento === 'envio_formulario_landing').length;

      let alertasPendientes = 0;
      consultas.forEach((c) => {
        if (Array.isArray(c.recordatorios)) {
          alertasPendientes += c.recordatorios.filter((r) => !r.completado).length;
        }
      });

      return {
        total_consultas_mes: totalMes,
        total_consultas_global: totalGlobal,
        consultas_con_cita: conCita,
        clientes_activos: clientesActivos,
        pendientes_nuevas: pendientesNuevas,
        porcentaje_conversion_cita: porcentajeCita,
        desglose_origen: desgloseOrigen,
        desglose_areas: desgloseAreas,
        clics_whatsapp: clicsWhatsapp,
        clics_telefono: clicsTelefono,
        envios_web: enviosWeb,
        envios_landing: enviosLanding,
        alertas_24h_pendientes: alertasPendientes
      };
    },

    formatearPlantilla(plantillaId, consulta) {
      const plantillas = this.obtenerPlantillas();
      const p = plantillas.find((item) => Number(item.id) === Number(plantillaId)) || plantillas[0];
      if (!p) return { asunto: '', cuerpo: '' };

      const nombre = (consulta && consulta.nombre_completo) ? consulta.nombre_completo : 'Cliente';
      const area = (consulta && consulta.area_practica) ? consulta.area_practica : 'Asesoramiento Jurídico';
      const expediente = (consulta && consulta.codigo_expediente) ? consulta.codigo_expediente : 'EXP-2026';

      const reemplazar = (texto) =>
        (texto || '')
          .replace(/\{nombre\}/g, nombre)
          .replace(/\{area\}/g, area)
          .replace(/\{expediente\}/g, expediente);

      return {
        id: p.id,
        titulo: p.titulo,
        asunto: reemplazar(p.asunto_email),
        cuerpo: reemplazar(p.cuerpo_mensaje)
      };
    },

    restaurarDatosIniciales() {
      const inicial = generarEstadoInicial();
      guardarStore(inicial, 'reset_demo');
      return inicial;
    }
  };

  window.MeryemCRM = MeryemCRM;
})(window);

