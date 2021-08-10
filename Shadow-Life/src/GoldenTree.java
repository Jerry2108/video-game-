import bagel.Font;
import bagel.Image;

public class GoldenTree extends Actor {
    GoldenTree(String imageName) {
        super(imageName);

    }
    public void update(Actor target) {
        target.collideTree(this);
    }
}
