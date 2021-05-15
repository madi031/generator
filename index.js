const generateText = () => {
  let privateKey = document.querySelector('#private-key').value;
  let appName = document.querySelector('#app').value;
  let keyText = document.querySelector('#key-text');
  let skipSpecialChars = document.querySelector('#skip-special-chars').checked;


  let alphabets = 'qwertyuiopasdfghjklzxcvbnm';
  let capsAlphabets = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  let numerics = '0123456789';
  let specialChars = '!@_)(*&^%$#:;<>?';

  let hashCode = 0;

  for (let ch of privateKey) {
    hashCode += ch.charCodeAt(0);
  }

  for (let ch of appName) {
    hashCode += ch.charCodeAt(0);
  }

  let publicKey = '';
  let hashKey = `${privateKey}${appName}`;

  for (let index=0; index<hashKey.length; index++) {
    let ch = hashKey[index];

    let newKey = ch.charCodeAt(0) + hashCode;
    if (index % 4 === 0) {
      newKey = newKey % alphabets.length;
      publicKey += alphabets[newKey];
    } else if (index % 4 === 1) {
      newKey = newKey % capsAlphabets.length;
      publicKey += capsAlphabets[newKey];
    } else if (index % 4 === 2 && !skipSpecialChars) {
      newKey = newKey % specialChars.length;
      publicKey += specialChars[newKey];
    } else {
      newKey = newKey % numerics.length;
      publicKey += numerics[newKey];
    }
  }

  keyText.textContent = publicKey;

  let keyTextWrapper = document.querySelector('.key-text-wrapper');
  keyTextWrapper.style.display = 'flex';
}

const copyPublicKey = () => {
  let keyText = document.querySelector('#key-text').textContent;
    
  navigator.clipboard.writeText(keyText).then(() => {
    document.querySelector('#copy-image').src = './done.svg';

    setTimeout(() => {
      document.querySelector('#copy-image').src = './copy.svg';
    }, 3000);
  });
}

let showKey = false;
const showHideKey = () => {
  showKey = !showKey;

  if (showKey) {
    document.querySelector('#show-key').src = './hide.svg';
    document.querySelector('#private-key').type = 'text';
  } else {
    document.querySelector('#show-key').src = './show.svg';
    document.querySelector('#private-key').type = 'password';
  }
}

let showApp = false;
const showHideApp = () => {
  showApp = !showApp;

  if (showApp) {
    document.querySelector('#show-app').src = './hide.svg';
    document.querySelector('#app').type = 'text';
  } else {
    document.querySelector('#show-app').src = './show.svg';
    document.querySelector('#app').type = 'password';
  }
}