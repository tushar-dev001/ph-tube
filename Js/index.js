const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );

  const data = await response.json();

  const tabContainer = document.getElementById("tab-container");

  data.data.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick= 'handleLoadNews(${category.category_id})' class="tab tab-active">${category.category}</a> 
        `;
    tabContainer.appendChild(div);
  });
};

// hours part
// function secondsToHoursAndMinutes(seconds) {
//     let minutes = Math.floor(seconds / 60);
//     let hours = Math.floor(minutes / 60);

//     minutes = minutes % 60;

//     return {
//       hours: hours,
//       minutes: minutes,
//     };
//   }
//   const totalSeconds = ${categoryId};
//   const timeObject = secondsToHoursAndMinutes(totalSeconds);

//   console.log(`${timeObject.hours} hours, ${timeObject.minutes} minutes age`);

const handleLoadNews = async (categoryId) => {
  //   console.log(categoryId);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const data = await response.json();
  //   console.log(data);

  const cardContainer = document.getElementById("card-container");
  const statusContainer = document.getElementById("status-container");
  cardContainer.innerHTML = "";

  if (data.status == true) {
    const videoData = data.data;
    videoData.sort((a, b) => {
      return b - a;
    });
    videoData.forEach((data) => {
        // console.log(data.others.posted_date);

      const div = document.createElement("div");
      div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl">
            <figure>
            <div class=' '>
              <img
                src=${data.thumbnail}
              />
              <p class='bg-black-200 '>${data.others.posted_date? data.others.posted_date : "a few"} seconds ago</p>
              </div>
            </figure>
            <div class="">
              <!-- <div class="card-body"> -->
              <div class="flex items-center gap-8">
                <!-- avater start -->
                <div>
                  <div class="avatar">
                    <div class="w-16 rounded-full">
                      <img
                        src=${data.authors[0].profile_picture}
                      />
                      </div>
                      
                  </div>
                </div>
                <!-- avater end -->
                <div>
                  <h2 class="card-title mt-4">
                   ${data.title}
                  </h2>
                  <div class="flex items-center my-2 gap-2">
                    <p>${data.authors[0].profile_name}</p>
                    
                    <div> '${
                      data.authors[0].verified === true
                        ? '<i class="fa-solid fa-circle-check" style="color: #0fff2b;"></i>'
                        : ""
                    }' </div>
                    
                  </div>
                  <p>${data.others.views}</p>
                  
               
                  
                </div>
              </div>
            </div>
          </div>
            `;
      cardContainer.appendChild(div);
    });
  } else {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="text-center my-32">
    <img class= 'mx-auto' src="images/icon.png" alt="">
    <p class="text-8xl font-bold">${data.message}</p>
    </div>
    `;
    statusContainer.appendChild(div);
    return
  }
};

handleCategory();
handleLoadNews(1000);
