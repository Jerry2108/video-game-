
import bagel.*;
import bagel.Image;
import bagel.Window;
import java.io.File;
import java.sql.Array;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;

public class ShadowLife extends AbstractGame {
    //set up the static background

    private Image background = new Image("images/background.png");
    private static final double topLeftX = 0, topLeftY = 0;
    private static final int TICK = 500;
    private static final int MAX_TICKS = 2000;
    private static int numTicks = 0;
    //get the time when the simulation is called initially
    private long lastTime = System.currentTimeMillis();
    /*create a ReadCsv class to store all objects from
    the Csv file need to be drawn later */
    ReadCsv myCsv = new ReadCsv("worlds/product.csv");
    private ArrayList<ArrayList<Actor>> actorsAl = myCsv.getActors();
    public static void main(String[] args) {
        //create a game as the ShadowLife object
        ShadowLife game = new ShadowLife();
        // run the game
        game.run();
    }

    /* whenever the update method get called automatically, all actions
    in this method are gonna be taken again */
    @Override
    protected void update(Input input) {
        //draw the back ground first
        background.draw(topLeftX, topLeftY);
        background.draw(Window.getWidth() / 2, topLeftY);
        background.draw(topLeftX, Window.getHeight() / 2);
        background.draw(Window.getWidth(), Window.getHeight());

        /*Scan through the array list of object need to appear
        on a screen and draw them*/
        for (ArrayList<Actor> actors : actorsAl) {
            for (Actor actor : actors) {
                if (actor.getLastTime() < 0) {
                    actor.setLastTime(lastTime);
                }
            }
        }
        for (int i = 0; i < 2; i++) {
            for (Actor movingActor : actorsAl.get(i)) {
                if (System.currentTimeMillis() - movingActor.getLastTime() >= TICK) {
                    movingActor.setLastTime(System.currentTimeMillis());
                    movingActor.updateActive();
                    for (int j = 2; j < actorsAl.size(); j++) {
                        movingActor.updatePosition(actorsAl.get(j), actorsAl.get(i));
                    }
                    ArrayList differentMovingClass = actorsAl.get(Math.abs(i - 1));
                    movingActor.updatePosition(differentMovingClass, actorsAl.get(i));
                }
            }
        }
        for (ArrayList<Actor> actors : actorsAl) {
            for (Actor actor : actors) {
                actor.drawImage();
                if (actor.getFruits() >= 0) {
                    actor.font.drawString(Integer.toString(actor.getFruits()), (int) (actor.getX() - 30),
                            (int) (actor.getY() - 30));
                }
            }
        }

    }
}









