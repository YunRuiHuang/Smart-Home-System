
import java.io.BufferedWriter;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class RunClient implements Runnable {

    @Override
    public void run() {
        // TODO Auto-generated method stub
        Scanner input = new Scanner(System.in);
        System.out.println("1、主动连接\n2、被动等待");
        String sign=input.next();
        switch (sign) {
            case "1":
                try {
                    System.out.println("输入服务器IP：");
                    startClient(input.next());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case "2":
                try {
                    startClient();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;

            default:
                break;
        }
    }


    /**
     * 由已经建立的socket 进行连接反向连
     * @throws Exception
     * @throws UnknownHostException
     */
    public void startClient() throws Exception{

        while(true){
            try {
                if(RunServer.socket!=null){
                    break;
                }
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }


        // 与服务器建立连接
        Socket socket=new Socket(RunServer.socket.getInetAddress().getHostAddress(), 8888);
        System.out.println("连接建立成功...");

        //向服务器写入流
        OutputStream os=socket.getOutputStream();
        BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(os));
        Scanner input=new Scanner(System.in);

        while(true){
            System.out.println("输入信息：");
            bw.write(input.next());
            bw.newLine();
            bw.flush();
        }
    }

    /**
     * 通过IP与服务器建立连接
     * @throws Exception
     * @throws UnknownHostException
     */
    public void startClient(String ip) throws Exception{
        // 与服务器建立连接
        Socket socket=new Socket(ip, 8888);
        System.out.println("连接建立成功...");

        //向服务器写入流
        OutputStream os=socket.getOutputStream();
        BufferedWriter bw=new BufferedWriter(new OutputStreamWriter(os));
        Scanner input=new Scanner(System.in);

        while(true){
            bw.write(input.next());
            bw.newLine();
            bw.flush();
        }
    }
}