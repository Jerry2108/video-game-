import java.util.ArrayList;

public interface Reset{
    final String LEFT = "left";
    boolean checkCollision(ArrayList<Actor> targets);
    void goUp();
    void goDown();
    void goLeft();
    void goRight();
    void rotate180();
    void move(boolean forward);



}
