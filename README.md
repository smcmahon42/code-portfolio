code-portfolio
==============

# About

A collection of code that I have contributed to and built during my career as a front-end developer.

Below is a summary of each project and what my participation was.

NOTE: I removed images and videos from the files to make the download faster. 

## Gamestem Min App

Gamestem is an internal project developed at Mindspace that generated outcomes and actions that had to do with gamificaiton. My roll was to build out the CSS3, HTML5 and JavaScript parts to make it have animation and flow. The PHP actions were built by another developer. This is one of the most simplistic, straightforward applications I have built.

        * CSS
        * JavaScript
        * jQuery

## Virgin America Go Big Bingo Game

(Project timeline 3 weeks and no QA time)

Virgin America Go Big Bingo was as the title states, a bingo game. A user would sign up to play through their Virgin America rewards account and answer multiple-choice questions. When a user answered a question correctly they received a stamp on their bingo board. If the user answered all questions correctly in so many tries, they would win a prize. Once a prize was won, they could double down (go big) for a bonus question, which would result in a bigger prize or they had the option to take the original prize awarded.

This game lasted for 30 days. Once the user signed in, the JavaScript made a local API call to pull back information about the randomized winning row for bingo and the random multiple-choice questions that they had to answer correctly to progress through the game. I made a randomized numbered game board with a randomized sequence of winning and loosing game moves in JavaScript so each game play would be unique.

On this project I did not do a majority of CSS, and I did not develop certain functions in the base.js file (common/script/base.js). The functions that I did not develop are animateWrongAnswer(), animateCorrectAnswer(), nextQuestion(), selectChoice(). I developed all other functions and site structure.

        * JavaScript
        * jQuery

## Hyatt The Chase Game

(Project timeline 2 weeks and minimal QA time)

Hyatt Hotels The Chase, was an adventure game created specifically for Hyatt Members. A user would choose from several paths, collect prize trunks, and use virtual money. If the user followed the clues correctly, they would collect Hyatt points. These points could be used toward dining and hotels stays. 

I handled the mobile phone and tablet game, which was entirely separate from the desktop game events and JavaScript logic. I built a light jQuery plugin that would route secondary pages to the index page using AJAX calls, since this game was going to be a single page game app like Virgin America. I built the plugin as a rapid prototype a few days before I knew I was going to be on this project. I ended up using the plugin in beta format since we needed to complete the project quickly and added code as I went along. The plugin is under /assets/script/router.js

I’ve been asked why I didn’t use JavaScript Framework for this project. My issue with using a JavaScript Framework was time and competency; most of the front-end developers at the time (including myself) had very little experience if any with it. The games were also customized and built so quickly, I feared that the Framework would get in the way and possibly delay the project.

        * CSS
        * JavaScript
        * jQuery

## Mindspace Site

Mindspace’s website was created as a game to show the company’s focus on gamificaiton. A user had to answer a question on each page in order to gain points, move around the site, and open more pages. After opening so many pages, prizes would start to unlock (three in all).

This site was ready to launch when I was hired at Mindspaee, but the launch date was delayed for changes. Changes included fixing code, and rebuilding sections entirely. After all was said and done, I developed about 70% of the code, which included the PHP, JavaScript, and half of the CSS. This site was later adapted to work with mobile phones, which I also contributed to building out. 

        * CSS
        * JavaScript
        * jQuery
        * PHP

## Online Radio App

Unfortunately I am not permitted to speak much about this awesome project because it is currently on going. I mainly built out a new look and feel on the CMS side of a radio app, which was built in Angular JS. The styling that I did was done using SCSS and complied using Grunt JS. The SCSS structure was taken from the ideas using SMACSS. I later developed several other logic parts in Angular JS, the Angular JS code in this repo was all built by me.

I also participated in the restyle of the radio application code (users side). We ended up using SCSS and attempted to use a similar structure using SMACSS like on the CMS.

        * SCSS
        * CSS
        * JavaScript
        * Angular JS
        * Grunt JS
        * Require JS
