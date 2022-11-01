import { draw_grid } from './utils/draw_grid.js';
import { Snake } from './models/Snake.js';

//* tous d'abord on instancie notre serpent
//* petite référence à la mtythologie scandinave <3
const jormungand = new Snake

const game = {

    //* pour initier la partie
    init: () => {
        // on dessine la grille
        draw_grid();  
        // on dessine le serpent
        jormungand.draw();  
        // on active les touches directionnelles ZQSD
        game.user_input();
        // le serpent commence à se déplacer :)
        game.on_move();

    },

    //* méthode pour gérer les évènements sur les touche ZQSD et modifier la valeur de la direction du serpent
    user_input: () => {
        document.addEventListener('keypress', (event) => {
            switch (event.key) {
                case "z":
                    jormungand.direction = "top";
                    break;
                case "q":
                    jormungand.direction =  "left";
                    break;
                case "s":
                    jormungand.direction =  "bottom";
                    break;
                case "d":
                    jormungand.direction =  "right";
                    break;
            };     
        });
    },
   
    //* méthode qui itère selon un interval régulier pour faire avancer le serpent
    on_move: () => { 
        
        setInterval(() => { 
            //! js c'est parfois bizarre ici pour évitéer que la variable soit liée aux changement de l'index du tableau:
            //! une succession de méthode pour le détacher de ce lien
            const array = JSON.parse(JSON.stringify([...jormungand.body_cordinates.slice()]));
            const last_head_position = array[0];
            
            //* le switch permet de modifier la position de la tête selon la valeur de la direction
            //* on a ensuite des if() qui permettent de gérer l'arriver du snake en bout de grille et le faire réaparaitre de l'autre côté
            switch (jormungand.direction) {
                case 'right':
                    if(jormungand.body_cordinates[0].x < 1107 - 41) {
                        jormungand.body_cordinates[0].x += 41;
                    } else {
                        jormungand.body_cordinates[0].x = 1; 
                    }
                    break;
                case 'left':
                    if(jormungand.body_cordinates[0].x > 41) {
                        jormungand.body_cordinates[0].x -= 41;
                    } else {
                        jormungand.body_cordinates[0].x = 1108; 
                    }
                    break;
                case 'top':
                    if(jormungand.body_cordinates[0].y > 41) {
                        jormungand.body_cordinates[0].y -= 41;
                    } else {
                        jormungand.body_cordinates[0].y = 698;
                    }
                    break;
                case 'bottom':
                    if(jormungand.body_cordinates[0].y < 697 - 41) {
                        jormungand.body_cordinates[0].y += 41;
                    } else {
                        jormungand.body_cordinates[0].y = 1;
                    }
                    break;
            };

            //* on met à jour les positions de chaque parties du corps
            jormungand.update_cordinates(last_head_position);
            //* on redessine tout (grille puis serpent)
            draw_grid();
            jormungand.draw();  
 
        }, jormungand.mouvement_speed);
    },
};

//* LET'S GOO!
game.init();