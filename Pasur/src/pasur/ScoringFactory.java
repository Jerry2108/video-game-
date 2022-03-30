package pasur;

public class ScoreFactory {
    public static ScoreFactory instance;
    public static synchronized ScoreFactory getInstance() {
        if (instance == null )
            instance = new ScoreFactory();
        return instance;
    }
}
