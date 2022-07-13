

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;


public class RunServer {
    public static Socket socket=null;
    /**
     * 建立服务器被动连接
     * @throws IOException
     */
    public void startServer() throws IOException {
        //服务器接收数据
        ServerSocket serverSocekt=new ServerSocket(8888);
        System.out.println("服务器启动，等待连接...");
        //创建客户端线程
        RunClient rc=new RunClient();
        Thread rct=new Thread(rc);
        rct.start();


        //阻塞线程 监听端口建立socket会话
        RunServer.socket=serverSocekt.accept();


        //获取输入留
        InputStream is=socket.getInputStream();
        //将字节输入流转换成字符输入流
        InputStreamReader isr=new InputStreamReader(is);
        //将字符输入流装入带缓冲的输入流中
        BufferedReader br=new BufferedReader(isr);

        String str=null;
        while((str=br.readLine())!=null){
            System.out.print("输出信息："+str);
        }
        socket.shutdownInput();
        serverSocekt.close();
    }
}