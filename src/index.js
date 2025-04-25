const cheerio = require('cheerio');
/**
 * Main function to scrape Booking.com data
 * @param {string} url - Booking.com hotel page
 */

function validURL(url){
  url = new URL(url);
  return ((url.protocol == 'http' || url.protocol == 'https') && url.hostname == 'booking.com');
}

async function requestBooking(url) {
  if (!validURL(url)){
    console.error('Invalid URL format https://booking.com/url/to/your/hotel');
    return false;
  }
  const response = await fetch(url);
  if (response.status !== 200) {
    console.error('Invalid url. Status code:', response.status);
    return false;
  }
  const body = await response.text();
  let $ = cheerio.load(body);
  const res = {
    score: await extractBookingScore($),
    reviews: await extractReviews($)
  }
}

async function extractBookingScore($) {
  let overAll = {
      score: +$('body').find('div[data-testid="review-score-right-component"] div div').html().replace('Puntuación: ', '').replace('Rating: ', '').replace('Note:', '').replace('Bewertung:', '').trim(),
      text: $('body').find('div[data-testid="review-score-right-component"] div').children().eq(1).find('div').text().trim()
  };
  if (typeof overAll.score != typeof 1)
      console.error('Error on booking score. Response: ', $('body').find('div[data-testid="review-score-right-component"] div div').html().replace('Puntuación: ', '').replace('Rating: ', ''));
  return overAll;
}

async function extractReviews($){
  let reviews = $('div[data-testid="featuredreview"]');
  let results = [];
  for (let i = 0; i < reviews.length; i++) {
    results.push(
      {
        name: $(reviews[i]).find('[data-testid="featuredreview-avatar"] div').children().eq(1).children().eq(0).text().trim(),
        country: $(reviews[i]).find('[data-testid="featuredreview-avatar"] div').children().eq(1).children().eq(1).text().trim(),
        text: $(reviews[i]).find('[data-testid="featuredreview-text"] div').children().eq(0).text().trim(),
      }
    )
  }
  return revs;
}

module.exports = {
  bookingRequest,
  extractBookingScore,
  extractReviews
};
