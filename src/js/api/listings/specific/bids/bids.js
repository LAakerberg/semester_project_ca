export function allBids(sortBids) {
  const specificBids = document.querySelector('#list-bids');
  specificBids.innerHTML = ``;

  /*
  The posts that's is requested from getPosts will be rendered here so the content
  will be search able. It's will also be adding the posts to the main page.
  */

  sortBids.forEach(function (requestBids) {
    const specBids = requestBids.bids;
    specificBids.innerHTML += `
        
        <!-- Product card -->
        <div
          class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-32 h-20 shadow-lg hover:shadow-slate-400/50">
            <div class="p-1">Bid by: ${specBids.bidderName}</div>
            <div class="p-1">Amount: ${specBids.amount}</div>
        </div>
        <!-- Product card END -->
        
        `;
  });
}

/* sortBids.for (let i = 0; i < specificResults.bids.length; i++) {
    const specBids = specificResults.bids[i];
    specificBids.innerHTML += `
    
    <!-- Product card -->
    <div
      class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-auto w-32 h-20 shadow-lg hover:shadow-slate-400/50">
        <div class="p-1">Bid by: ${specBids.bidderName}</div>
        <div class="p-1">Amount: ${specBids.amount}</div>
    </div>
    <!-- Product card END -->
    
    `;
  } */
