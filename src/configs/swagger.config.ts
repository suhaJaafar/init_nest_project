import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { config } from 'dotenv';
import { Tag } from '@app/enums';

config();

const isDev = process.env.NODE_ENV === 'development';
const backendUrl = isDev
  ? 'http://localhost:3001'
  : (process.env.PLATFORM_BACKEND ?? 'https://api.Tawaslapp.com');
const environment = isDev ? 'local' : 'production';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Tawasl APIs')
    .setDescription('Tawasl app backend APIs')
    .setVersion('1.0')
    .setContact(
      'Tawasl team',
      'https://Tawaslapp.com/support',
      'info@Tawaslapp.com',
    )
    .addServer(backendUrl, environment)
    .addBearerAuth();
  // .addCookieAuth();

  const tags: Record<Tag, string> = {
    [Tag.Authentication]: 'Authentication APIs',
    [Tag.Users]: 'Users of the platform',
    [Tag.Admin]: 'Admin APIs',
    [Tag.Programs]: 'Programs management',
    [Tag.Images]: 'Images management',
    [Tag.Initiatives]: 'Initiatives management',
  };

  if (!isDev) {
    // Hide admin APIs in production
    tags[Tag.Admin] = '';
  }

  Object.entries(tags)
    // Sort tags alphabetically
    .sort((a, b) => a[0].localeCompare(b[0]))
    // Remove empty tags
    // .filter(([_name, val]) => !!val)
    .forEach(([name, description]) => config.addTag(name, description));

  const document = SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('/api/swagger', app, document, {
    explorer: true,
    jsonDocumentUrl: '/api/swagger/api-docs.json',
    yamlDocumentUrl: '/api/swagger/api-docs.yaml',
    customSiteTitle: 'Tawasl API',
    swaggerOptions: { docExpansion: 'none' },
    customfavIcon: '/favicon.png',
    customCssUrl: '/swagger/swagger.css',
    customJs: '/swagger/swagger.js',
  });
}
