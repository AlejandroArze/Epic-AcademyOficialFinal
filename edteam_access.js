const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  try {
    console.log('🚀 Iniciando acceso a EDTeam');
    
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--window-size=1920,1080'
      ]
    });

    const page = await browser.newPage();
    
    // Configuraciones de evasión de detección
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // URLs de intento
    const urls = [
      'https://app.ed.team',
      'https://ed.team/login',
      'https://app.ed.team/login'
    ];

    for (const url of urls) {
      try {
        console.log(`🔍 Intentando acceder a: ${url}`);
        
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 45000
        });

        // Estrategias de login
        const loginStrategies = [
          async () => {
            // Login por correo
            await page.type('#email', process.env.EDTEAM_EMAIL || 'tucorreo@ejemplo.com');
            await page.type('#password', process.env.EDTEAM_PASSWORD || 'tucontraseña');
            await page.click('button[type="submit"]');
          },
          async () => {
            // Login con Google
            const googleButtons = [
              'button[data-provider="google"]',
              'a[href*="google/login"]',
              '[aria-label="Continuar con Google"]'
            ];

            for (const selector of googleButtons) {
              try {
                await page.waitForSelector(selector, { timeout: 5000 });
                await page.click(selector);
                break;
              } catch {}
            }
          }
        ];

        // Ejecutar estrategias de login
        for (const strategy of loginStrategies) {
          try {
            await strategy();
            await page.waitForNavigation({ 
              waitUntil: 'networkidle0',
              timeout: 30000 
            });
            break;
          } catch (loginError) {
            console.log('❌ Estrategia de login fallida:', loginError);
          }
        }

        // Captura de pantalla de verificación
        await page.screenshot({ path: 'edteam_acceso.png' });

        console.log('✅ Acceso exitoso a EDTeam');
        break;

      } catch (urlError) {
        console.log(`❌ Error en URL ${url}:`, urlError);
      }
    }

  } catch (error) {
    console.error('❌ Error crítico:', error);
  }
})(); 