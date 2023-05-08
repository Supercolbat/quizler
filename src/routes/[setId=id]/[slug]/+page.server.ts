import { error } from '@sveltejs/kit';
import { JSDOM } from 'jsdom';

const QUIZLET_URL = 'https://quizlet.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; rv:112.0) Gecko/20100101 Firefox/112.0';

async function fetchFromWeb(url: string): Promise<Document> {
  return fetch(url, {
      'headers': {
        'User-Agent': USER_AGENT,
      },
      'method': 'GET',
    })
    .then((response) => response.text())
    .then((html) => {
      var doc = new JSDOM(html);
      return doc.window.document;
    })
    .catch((err) => {
      console.log(err);
      throw error(404);
    });
}

// TODO: make typescript happier
function serializeCards(cardsDict: any) {
  var serialized = [];

  for (let card of Object.values(cardsDict)) {
    serialized.push(
      {
        front: {
          text: card.word,
          audioSrc: card._wordAudioUrl,
          imageSrc: card._imageUrl,
        },
        back: {
          text: card.definition,
          audioSrc: card._definitionAudioUrl,
        },
      }
    );
  }

  return serialized;
}

export async function load({ params }) {
  // If the trailing slash is not included, then a CAPTCHA is shown
  const document = await fetchFromWeb(`${QUIZLET_URL}/${params.setId}/${params.slug}/`);

  // Return a "fitting" error code if a Cloudflare CAPTCHA is encountered
  if (/^Captcha Challenge/.test(document.querySelector('title')?.textContent || '')) throw error(420)

  // Scrape page for stored data
  const next_data = document.querySelector('#__NEXT_DATA__')?.textContent;
  if (next_data == undefined || next_data == null) throw error(404);

  // Parse stored data
  const outer_json = JSON.parse(next_data);
  const json = JSON.parse(outer_json.props.pageProps.dehydratedReduxStateKey);

  // Extract the goods
  const cards = serializeCards(json.setPage.termIdToTermsMap);
  const author = json.setPage.creator.username;
  const title = json.setPage.set.title;
  const description = json.setPage.set.description;
  const thumbnailUrl = json.setPage.set._thumbnailUrl;
  const recent = json.setPage.socialProofMessage && {
    numStudiers: json.setPage.socialProofMessage.numStudiers,
    time: json.setPage.socialProofMessage.time,
    timeUnit: json.setPage.socialProofMessage.timeUnit,
  };
  const rating = json.setPage.ratingAverage;
  const breadcrumbs = json.setPage.breadcrumbs;

  return {
    // Metadata
    author,
    title,
    description,
    thumbnailUrl,
    breadcrumbs,

    // User-interaction metadata
    recent,
    rating,

    // Data
    cards,

    // Used for debugging, will get removed later
    next_data: `<script id='__NEXT_DATA__' type='application/json'>${next_data}</script>`,
  };
}
