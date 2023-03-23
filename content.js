//const puppeteer = require('puppeteer');

function removeHiddenClass() {
  const hiddenElems = document.querySelectorAll(".hidden");
  for (let elem of hiddenElems) {
    elem.classList.remove("hidden");
  }
  console.log("Hidden class removed!");
}

async function getCookies() {
  const cookies = document.cookie;
  const csrf = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("_csrf="));

  const sessionSig = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("session.sig="));
  const sessionUuid = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("session.uuid="));
  const session = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("session="));

  const cookieString = `_csrf=${csrf}; session.sig=${sessionSig}; session.uuid=${sessionUuid}; session=${session}`;
  return cookieString;
}

function getPostIds() {
  const postIdsCookie = document.cookie.split(";")
  .find((cookie) => cookie.trim().startsWith("postIds="));

  if (!postIdsCookie) {
    console.log("No stored post IDs found.");
  }
  return postIdsCookie;
}

async function getPostCsrfToken(url, cookies) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.goto(url, {
    waitUntil: "networkidle2",
  });
  const csrfToken = await page.$eval("#_csrf", (el) => el.value);
  await browser.close();
  return csrfToken;
}

async function deletePost(postId, cookies) {
  const url = `http://localhost:8080/post/delete/${postId}`;

  const postCsrfToken = await getPostCsrfToken(url);
  const params = new URLSearchParams();
  params.append("id", postId);
  params.append("csrf", postCsrfToken);
}

async function deletePosts() {
  const postIds = JSON.parse(getPostIds().split("=")[1]);
  const cookies = getCookies();
  console.log(cookies);

  for (const postId of postIds) {
    await deletePost(postId, cookies);
  }

  document.cookie = "postIds=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function triggerDeleteButtons() {
  const postDeleteButtons = document.querySelectorAll(".btn-post-del");
  const postIds = [];

  // Get the IDs of all post delete buttons and store them in a cookie
  for (let i = 0; i < postDeleteButtons.length; i++) {
    const postId = postDeleteButtons[i].dataset.id;
    postIds.push(postId);
  }

  document.cookie = `postIds=${JSON.stringify(postIds)}`;

  console.log(`Stored post IDs: ${postIds}`);

  deletePosts();
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "reveal_elements") {
    removeHiddenClass();
  } else if (message.action === "trigger_buttons") {
    triggerDeleteButtons();
  }
});
