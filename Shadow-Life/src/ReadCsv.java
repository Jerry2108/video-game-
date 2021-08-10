import java.io.IOException;
import java.util.Scanner;
import java.io.File;
import java.util.ArrayList;

public class ReadCsv {
    /*this is an array list to store references whose
    types are Actor class*/
    private final int TOTAL = 13, INITIAL_FRUITS1 = 3;
    private final int INITIAL_FRUITS2 = 0;
    private int count = 0;
    //private ArrayList <Actor> actors = new ArrayList<>();
    ArrayList<ArrayList<Actor> > differentActors = new ArrayList<ArrayList<Actor> >(13);
    ReadCsv(String fileName) {
        for (int i = 0;i < 13; i++){
             differentActors.add(new ArrayList<>());
        }
        //use scanner to read a csv file line by line
        int count = 0;
        try {
            Scanner scanner = new Scanner(new File(fileName));
            Scanner valueScanner = null;
            int index = 0;
            /*check if there is still a line to read for each iteration
            if not, stop reading*/
            while (scanner.hasNextLine()) {
                valueScanner = new Scanner(scanner.nextLine());
                valueScanner.useDelimiter(",");
                /*create an Actor reference pointing to
                an object of a child class of the Actor class*/
                String data = valueScanner.next();
                Actor actor ;
                //check which child object we need to instantiate
                if (data.equals("Gatherer")){
                    actor = new Gatherer("images/gatherer.png");
                    differentActors.get(0).add(actor);
                }
                else if (data.equals("Thief")){
                    actor = new Thief("images/thief.png");
                    differentActors.get(1).add(actor);
                }
                else if (data.equals("Fence")){
                    actor = new Fence("images/fence.png");
                    differentActors.get(2).add(actor);
                }
                else if (data.equals("Pool")){
                    actor = new Pool("images/pool.png");
                    differentActors.get(3).add(actor);
                }
                else if (data.equals("SignUp")){
                    actor = new Updirection("images/up.png");
                    differentActors.get(4).add(actor);
                }
                else if (data.equals("SignDown")){
                    actor = new DownDirection("images/down.png");
                    differentActors.get(5).add(actor);
                }
                else if (data.equals("SignRight")){
                    actor = new RightDirection("images/right.png");
                    differentActors.get(6).add(actor);
                }
                else if (data.equals("SignLeft")){
                    actor = new LeftDirection("images/left.png");
                    differentActors.get(7).add(actor);
                }
                else if (data.equals("Tree")){
                    actor = new Tree("images/tree.png");
                    differentActors.get(8).add(actor);
                }
                else if (data.equals("Stockpile")){
                    actor = new StockPile("images/cherries.png");
                    differentActors.get(9).add(actor);
                }
                else if (data.equals("Hoard")){
                    actor = new Hoard("images/hoard.png");
                    differentActors.get(10).add(actor);
                }
                else if (data.equals("Pad")) {
                    actor = new Pad("images/pad.png");
                    differentActors.get(11).add(actor);
                }
                else {
                    actor = new GoldenTree("images/gold-tree.png");
                    differentActors.get(12).add(actor);
                }
                index++;
                /*get coordinates for the object from the rest data on the same
                line*/

                while (valueScanner.hasNext()){
                    data = valueScanner.next();
                    //get the x coordinate
                    if (index == 1) {
                        actor.setX(Double.parseDouble(data));
                    }
                     //get the y coordinate
                    else if (index == 2) {
                        actor.setY(Double.parseDouble(data));
                    }
                    index++;
                }

                index = 0;
                count++;
            }
            scanner.close();
        }

        //catch errors if the file cann=iiot be opened
        catch (IOException ex) {
            System.err.println("An IOException was caught!");
            ex.printStackTrace();
        }

    }
    public ArrayList<ArrayList<Actor>> getActors(){
        return differentActors;
    }

}
