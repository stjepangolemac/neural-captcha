# neural-captcha

### Description
This is a synapticjs implementation of the neural network designed to crack one particular type of captchas.

### Knowledge database format
Knowledge database must be properly formatted according to this template:
```
[
  {
    letter: "a",
    pixels: [1,0,1,0,0,1,...]
  },
  {
    letter: "b",
    pixels: [1,1,0,0,0,1,...]
  },  
  ...
]
```
Property **letter** should be a string with only one character and property **pixels** should be an array of 256 numbers.

### How to setup
1. `git clone https://github.com/stjepangolemac/neural-captcha.git`
2. `npm install`
3. put knowledge database to db/ directory and name it db.json

### How to use
1. Run `npm run build` and browser bundle will be generated in the gen/ directory with a name `neural-captcha-bundle.js`
3. Copy and import that bundle into your html document: `<script src="neural-captcha-bundle.js"></script>`
4. Call `neural()` and pass the pixels of the letter you want it to recognize: `console.log(neural([0,0,0,1,1,...])`
5. The result is an array of all letters along with their chances

