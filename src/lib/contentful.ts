const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';

const GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

interface GraphQLResponse<T> {
  data: T;
  errors?: any[];
}

export async function fetchGraphQL<T>(query: string, variables = {}): Promise<T> {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    throw new Error('CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be defined in environment variables');
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: { tags: ['contentful'] }, // Optional: for Next.js caching/revalidation
  });

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    console.error('Contentful GraphQL Errors:', json.errors);
    throw new Error('Failed to fetch data from Contentful');
  }

  return json.data;
}

export const LANDING_PAGE_QUERY = `
  query GetLandingPage {
    landingPageCollection(limit: 1) {
      items {
        title
        titleMessage {
          json
        }
        whatArtistsSay {
          json
        }
        footer {
          json
        }
        logo {
          url
          title
          description
          width
          height
        }
        socialNetworks {
          json
        }
        ourServices {
          json
        }
        services {
          json
        }
        portfolioCatalog {
          json
        }
        beatTypes {
          json
        }
        beats {
          json
        }
        servicesProTitle {
          json
        }
        servicesPro {
          json
        }
      }
    }
  }
`;

export async function getLandingPageData() {
  const data = await fetchGraphQL<any>(LANDING_PAGE_QUERY);
  return data?.landingPageCollection?.items[0];
}
