export function renderList(listToRender) {
  const auctionListings = document.querySelector('#auction-list');
  auctionListings.innerHTML = '';

  listToRender.forEach(function (listings) {
    const dateRequested = new Date(`${listings.endsAt}`);
    // Formats the date from the request to be more user friendly and readable
    const dateFormatted = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);

    //const dateTime = correctDate(listingsResults[i].endsAt);

    /*     const listingsTitle = listingsResults[i].title.slice(0, 20); */
    /*     const listingsMedia = listingsResults[i].media[0]; */
    /*     const listings = listingsResults[i].id; */

    if (listings.media[0] === undefined) {
      listings.media[0] =
        'https://static.thenounproject.com/png/2884221-200.png';
    }

    const listingsMedia = listings.media[0];
    const listingsTitle = listings.title;

    //const listingsBids = listingsResults[i].bids[0].amount;
    //const listingsCreated = listingsResults[i].created;
    const listingsEnd = newFormat;

    auctionListings.innerHTML += `
              <!-- Product card -->
              <a href="/pages/listings/specific/?id=${listings.id}"/>
              <div
                class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-48 shadow-lg hover:shadow-slate-400/50"
              >
                <div class="h-4/6 border-b-2 border-slate-500">
                  <img
                    src="${listingsMedia}"
                    class="img-style rounded-t-lg w-48 h-32"
                  />
                </div>
                <div class="p-1">${listingsTitle.slice(0, 20)}</div>
                <div class="p-1">Ends: ${listingsEnd}</div>
              </div>
              </a>
              <!-- Product card END -->
              `;
  });
}
