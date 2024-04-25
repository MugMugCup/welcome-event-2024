import sys
import socket
import selectors
import threading
import time
import eel
import re
import pygame
import xml.etree.ElementTree as ET

HOST = 'localhost'
PORT = 20001
statu_server=False
ship_time=1.5

server_statu_code=False
send_datalist=[]
finish_key=-1

sock_list={}
class team:
    def __init__(self):
        self.point=0
        self.distans=0
        self.roll_dice=0
        self.buf=""
        self.statu=0
        self.use=1

teamlist={}
socket_list={}
class sock_t:
    def __init__(self,a):
        self.statu=a
        self.id=-1
    pass
sock_statu={}

def printf(zat):
    eel.logprint(zat)
    print(zat)

pc_list={}
pc_index=0
def add_team(teamname):
    global teamlist
    teamname=str(teamname)
    try:
        if teamname in teamlist:
            printf("info: already added team "+teamname)
            append_senddata(0,":310::"+teamname+":")
            return
        temp=team()
        teamlist[teamname]=temp
        printf("success: added team "+teamname)
        # append_senddata(0,":300::"+teamname+"::0::0::0:")
        try:
            eel.set_ship(teamname)
        except:
            pass
        data2=":1::"+str(teamname)+"::"+str(teamlist[teamname].point)+":"
        thread1=threading.Thread(target=append_send_data2,daemon=True,args=(data2,))
        thread1.start()
    except :
        printf("error : cannot add team "+teamname)
        
def calculate_points(teamname,point):
    global teamlist
    if teamname not in teamlist:
        printf("error:not in teamlist please register team")
        return
    teamlist[teamname].point += int(point)
    printf("success:add point" + "teamname=" + teamname + " " + str(teamlist[teamname].point))
    if(teamlist[teamname].statu != 10000):
        teamlist[teamname].statu=0
    try:
        eel.moving_remove(teamname,2)
        eel.logprint_moved(teamname)
    except:
        pass
    global client_statu
    if(client_statu==False):
        data2=":1::"+str(teamname)+"::"+str(teamlist[teamname].point)+":"
        thread1=threading.Thread(target=append_send_data2,daemon=True,args=(data2,))
        thread1.start()
    pass

def calculate_buf(teamname,buf):
    global teamlist
    if teamname not in teamlist:
        printf("error:not in teamlist please register team" )
        return
    teamlist[teamname].buf = buf
    printf("success:replace buf" + "teamname=" + teamname + " " + str(teamlist[teamname].buf))
    pass

def calculate_distans(teamname,distans):
    global teamlist
    temp_dis=teamlist[teamname].distans
    teamname=str(teamname)
    if teamname not in teamlist:
        printf("error:not in teamlist please register team")
        return
    teamlist[teamname].distans += int(distans)
    teamlist[teamname].roll_dice+=1
    printf("success:add distans" + "teamname=" + teamname + " " + str(teamlist[teamname].distans))
    # append_senddata(teamlist[teamname].distans,":300::"+teamname+"::"+str(teamlist[teamname].distans)+"::"+str(teamlist[teamname].point)+"::"+str(teamlist[teamname].buf)+":")
    teamlist[teamname].statu=1
    temp_thread=threading.Thread(target=calc_move_ship,daemon=True,args=(teamname,temp_dis,distans,))
    temp_thread.start()
    try:
        eel.moving_remove(teamname,0)
        eel.logprint_moved(teamname)
    except:
        pass
    pass


def add_buf(teamname,buf):
    global teamlist
    if teamname not in teamlist:
        printf("error:not in teamlist please register team")
        return
    teamlist[teamname].buf += buf
    printf("success:add buf" + "teamname=" + teamname + " " + str(teamlist[teamname].buf))
    pass

def calc_move_ship(teamname,now_dis,rel_dis):
    global finish_key
    global teamlist
    global ship_time
    while(teamlist[teamname].statu == 1):
        time.sleep(0.05)
        continue
    append_senddata(int(now_dis),":500::left::2:")
    now_dis=int(now_dis)+1
    rel_dis=int(rel_dis)
    temp_dis=now_dis+rel_dis
    while(now_dis != temp_dis-1):
        time.sleep(ship_time)
        if(finish_key == now_dis):
            append_senddata(now_dis,":500::left::1:")
            try:
                eel.move_ship_1(teamname,now_dis)
                eel.moving_remove(teamname,1)
            except:
                pass
            time.sleep(ship_time/2)
            append_senddata(now_dis,":450::"+teamname+"::"+str(teamlist[teamname].distans)+"::"+str(teamlist[teamname].point)+"::"+str(teamlist[teamname].roll_dice)+":")
            teamlist[teamname].statu=10000
            teamlist[teamname].use=0
            return
        try:
            eel.move_ship_1(teamname,now_dis)
        except:
            pass
        append_senddata(now_dis,":500::left::0:")
        now_dis+=1
    if(finish_key == teamlist[teamname].distans):
        append_senddata(now_dis,":500::left::1:")
        try:
            eel.move_ship_1(teamname,now_dis)
            eel.moving_remove(teamname,1)
        except:
            pass
        time.sleep(ship_time/2)
        append_senddata(now_dis,":450::"+teamname+"::"+str(teamlist[teamname].distans)+"::"+str(teamlist[teamname].point)+"::"+str(teamlist[teamname].roll_dice)+":")
        teamlist[teamname].statu=10000
        teamlist[teamname].use=0
        return
    time.sleep(ship_time)
    append_senddata(teamlist[teamname].distans,":500::left::1:")
    try:
        eel.move_ship_1(teamname,teamlist[teamname].distans)
        eel.moving_remove(teamname,1)
        eel.logprint_moved(teamname)
    except:
        pass
    time.sleep(ship_time/2)
    teamlist[teamname].statu=3
    # append_senddata(teamlist[teamname].distans,":300::"+teamname+"::"+str(teamlist[teamname].distans)+"::"+str(teamlist[teamname].point)+"::"+str(teamlist[teamname].buf)+":")
    pass

def calc_all(data):
    global teamlist
    temp_dis=teamlist[data[0]].distans
    calculate_distans(data[0],data[1])
    calculate_points(data[0],data[2])
    calculate_buf(data[0],data[3])
    try:
        eel.moving_remove(data[0])
        eel.logprint_moved(data[0])
    except:
        pass
    teamlist[data[0]].statu=-1
    temp_thread=threading.Thread(target=calc_move_ship,daemon=True,args=(data[0],temp_dis,data[1],))
    temp_thread.start()
    pass

def clac_sound(path):
    path="data/"+str(path)
    pygame.mixer.init()
    pygame.mixer.music.load(path)
    pygame.mixer.music.play()
    pass

@eel.expose
def turn_start():
    global teamlist
    printf("turn_start")
    try:
        eel.logprint_moving_clear()
        eel.logprint_moved_clear()
    except:
        pass

@eel.expose
def set_ship_move_time(time):
    global ship_time
    global PORT
    printf("info:set server port port="+str(time))
    PORT=int(time)

@eel.expose
def dice_turn_start():
    global teamlist
    try:
        eel.logprint_moving_clear()
        eel.logprint_moved_clear()
    except:
        pass
    for turn_i in teamlist.keys():
        if(teamlist[turn_i].use == 1 and teamlist[turn_i].statu== 0):
            eel.logprint_moving(str(turn_i))
            append_senddata(teamlist[turn_i].distans,":1000::"+turn_i+"::"+str(teamlist[turn_i].distans)+"::"+str(teamlist[turn_i].point)+"::"+str(teamlist[turn_i].buf)+":")
            pass
        pass
    pass

@eel.expose
def move_ship_turn_start():
    global teamlist
    try:
        eel.logprint_moving_clear()
        eel.logprint_moved_clear()
    except:
        pass
    for turn_i in teamlist.keys():
        if(teamlist[turn_i].use == 1 and teamlist[turn_i].statu==1):
            eel.logprint_moving(str(turn_i))
            teamlist[turn_i].statu=2
    pass

@eel.expose
def game_turn_start():
    global teamlist
    try:
        eel.logprint_moving_clear()
        eel.logprint_moved_clear()
    except:
        pass
    for turn_i in teamlist.keys():
        if(teamlist[turn_i].use == 1 and teamlist[turn_i].statu==3):
            eel.logprint_moving(str(turn_i))
            append_senddata(teamlist[turn_i].distans,":1100::"+turn_i+"::"+str(teamlist[turn_i].distans)+"::"+str(teamlist[turn_i].point)+"::"+str(teamlist[turn_i].buf)+":")
            teamlist[turn_i].statu=4
        pass
    pass



@eel.expose
def pc_setting():
    global sock_list
    global pc_index
    printf("info:pc_index clear")
    pc_index=0
    for temp in sock_list.keys():
        append_senddata(temp,":101:")
    pass

@eel.expose
def finish_set_index():
    global finish_key
    global pc_index
    finish_key=pc_index-1
    printf("sucsess :pc_index setting complate. (finsih_index="+str(finish_key)+")")


@eel.expose
def game_start():
    printf("info:game_start")
    for temp in sock_list.keys():
        append_senddata(temp,":400:")
    pass

@eel.expose
def game_finish():
    printf("info:game_finish")
    for temp in sock_list.keys():
        append_senddata(temp,":401:")
    pass


@eel.expose
def solve_problem(str2,data1="localhost"):
    global pc_list
    global pc_index
    root_p=r'::FF(.*?)FF::'
    p = r':(.*?):'
    str2= re.findall(root_p, str2)
    for str3 in str2:
        data= re.findall(p, str3)
        try:
            if(int(data[0])==200):
                #printf("teamname_calc")
                add_team(data[1])
                continue
            if (int(data[0])==100):
                ct=str(data1[0])+str(data1[1])
                if ct in pc_list:
                    printf("info : "+str(data1)+"is already in pc_list")
                    continue
                pc_list[str(pc_index)]=ct
                printf("success : "+str(data1)+"append pc_list(index="+str(pc_index)+")")
                append_senddata(pc_index,":102::"+str(pc_index)+":")
                pc_index=pc_index+1
                continue
            if (int(data[0])==301):
                calculate_distans(data[1],data[2])
                continue
                pass
            if(int(data[0])==302):
                printf(data[2])
                calculate_points(data[1],data[2])
                continue
            if(int(data[0])==305):
                calc_all([data[1],data[2],data[3],data[4]])
                continue
            if(int(data[0])==900):
                clac_sound(data[1])
                continue
        except:
            printf("info:Unknown string entered1")
        printf("info:Unknown string entered2")
        continue

@eel.expose
def new_window():
    eel.start("out.html", size=(1024, 768), port=0)

@eel.expose()
def server_stop():
    printf("info :server stopping. give me five seconds")
    global statu_server
    global server_statu_code
    global sock_list
    for temp in sock_list.keys():
        append_senddata(temp,":1:")
    time.sleep(5)
    server_statu_code=False
    statu_server=True

ipaddr_list=[]
ipaddr_list_bool=False

@eel.expose
def get_ip():
    global ipaddr_list
    global ipaddr_list_bool
    hostname = socket.gethostname()
    hostname, alias_list, ipaddr_list = socket.gethostbyname_ex(hostname)
    ipaddr_list_bool=True
    return ipaddr_list

@eel.expose
def set_ip_num(i):
    global HOST
    global ipaddr_list
    ipaddr_list_num = int(i)
    HOST=ipaddr_list[ipaddr_list_num]
    printf("ip_setting_complete")


@eel.expose
def append_senddata(data1,data2):
    global send_datalist
    send_datalist.append([data1,"::FF"+data2+"FF::"])
    print(send_datalist)
    pass


def send_data():
    global pc_list
    global sock_list
    global statu_server
    global send_datalist
    statu_server=False
    while True:
        if statu_server:
            break
        if (0<len(send_datalist)):
            tempdata1=send_datalist.pop(0)
            tempdata2=str(tempdata1[0])
            if (tempdata2 in sock_list):
                tempdata3=sock_list[tempdata2]
                pass
            else:
                if not(tempdata2 in pc_list):
                    printf("info :"+str(tempdata2)+"is not in pc_list")
                    continue
                tempdata2=pc_list[tempdata2]
                if not(tempdata2 in sock_list):
                    printf("info :"+str(tempdata2)+"is not in sock_list")
                    continue
                tempdata3=sock_list[tempdata2]
            try:
                printf("success : sending data "+str(tempdata2)+"  "+str(tempdata1))
                tempdata3.send(tempdata1[1].encode('utf-8'))
            except:
                printf("error :"+str(tempdata1) +"could not  be transmit.")
                #send_datalist.append(tempdata1)
                pass
    printf("info : sending system shutdown")


def start():
    print("server started")
    global HOST
    global PORT
    global sock_statu
    global statu_server
    global sock_list
    statu_server=False
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind((HOST, PORT))
        sock.listen(5)
        eel.logprint("Server is listening at {}:{}".format(HOST, PORT))
        print("Server is listening at {}:{}".format(HOST, PORT))
        sock.setblocking(False)
        with selectors.DefaultSelector() as selector:
            selector.register(sock, selectors.EVENT_READ)
            try:
                while True:
                    if statu_server:
                        break
                    ready = selector.select(timeout=5)
                    if not ready:
                        continue
                    for key, _ in ready:
                        if key.fileobj == sock:
                            try:
                                connection, client_address = sock.accept()
                                printf("Accepted from"+ str(client_address))
                                selector.register(connection, selectors.EVENT_READ)
                                sock_list[str(client_address[0])+str(client_address[1])]=connection
                            except:
                                pass
                        else:
                            connection = key.fileobj
                            raw_data = connection.recv(1024)
                            if not raw_data:
                                selector.unregister(connection)
                                temp123=connection.getpeername()
                                sock_list.pop(str(temp123[0])+str(temp123[1]))
                                printf("Closed connection to"+ str(connection.getpeername()))
                                connection.close()
                                break
                            datat=connection.getpeername()
                            printf("Received "+str(format(raw_data.decode('utf-8')))+" from "+str(datat))
                            solve_problem(raw_data.decode('utf-8'),datat)
            except KeyboardInterrupt:
                eel.logprint("EXIT")
                print("EXIT")
            except:
                sys.exc_info()[1]
    eel.logprint("server_stop")
    print("server_stop")

client_statu=False
client_start=False
send_data_data=""
send_data_bool=False
@eel.expose
def stop2():
    print("stopping")
    global client_statu
    global client_start
    client_statu=True
    client_start=False

@eel.expose
def start2():
    global client_statu
    global client_start
    global SERVER
    global PORT2
    tree = ET.parse('data/setting.xml')
    root = tree.getroot()
    SERVER=root.find('r_ip').text
    PORT2=int(root.find('r_port').text)
    if client_start:
        printf("info : client already started")
        return
    client_statu=False
    thread1 = threading.Thread(target=client,daemon=True)
    thread1.start()
    pass

def append_send_data2(data):
    print("sending")
    global send_data_bool
    while send_data_bool != False:
        time.sleep(0.1)
        pass
    send_data_bool=True
    global send_data_data
    send_data_data="::FF"+data+"FF::"

def solve_problem2(str2):
    global dise_list
    global client_index
    root_p=r'::FF(.*?)FF::'
    p = r':(.*?):'
    str2= re.findall(root_p, str2)
    for str3 in str2:
        data= re.findall(p, str3)
        try:
            if (int(data[0])==1):
                stop2()
                printf("info :the server has asked to be terminated.")
                return
            if (int(data[0])==5000):
                dice_turn_start()
                printf("info :the server has asked to dice_turn_start.")
                return
            if (int(data[0])==5001):
                move_ship_turn_start()
                printf("info :the server has asked to be move_ship_turn_start.")
                return
            if (int(data[0])==5002):
                game_turn_start()
                printf("info :the server has asked to be game_turn_start.")
                return
        except:
            printf("info:Unknown string entered")
            return
        printf("info:Unknown string entered")
        pass

def client_rcvdata(socket_data):
    global client_statu
    i100=0
    while True:
        if client_statu:
            break
        try:
            rcv_data=socket_data.recv(1024)
            data=rcv_data.decode('utf-8')
            printf("info :"+str(data)+"is received.")
            solve_problem2(data)
        except TimeoutError:
            print("timeout")
            pass
        except:
            pass
    printf("info : client_rcvdata is shutdown")



def client(timeout=0):
    global client_start
    client_start=True
    global send_data_bool
    global send_data_data
    global client_statu
    global SERVER
    global PORT2
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(10)
        try:
            sock.connect((SERVER, PORT2))
            printf('success : connected to server'+str(SERVER)+"port"+str(PORT2))
        except:
            stop2()
            printf('error : server='+str(SERVER)+" port="+str(PORT2)+" is not connected")
            return
        thread1=threading.Thread(target=client_rcvdata,daemon=True,args=(sock,))
        thread1.start()
        while True:
            if send_data_bool:
                try:
                    temp=send_data_data.encode('utf-8')
                    sock.sendall(temp)
                    printf("success : sending data to server="+str(send_data_data))
                    send_data_bool=False
                except:
                    printf("error : can't sending data to server="+str(send_data_data))
            if client_statu:
                sock.shutdown(socket.SHUT_WR)
                printf("info : client is shutting down")
                return




@eel.expose
def server_start():
    global server_statu_code
    if server_statu_code:
        printf("info : server already started")
        return
    server_statu_code=True
    th1=threading.Thread(target=start,daemon=True)
    th1.start()
    th2=threading.Thread(target=send_data,daemon=True)
    th2.start()
    pass
def onCloseWindow(page, sockets):
    stop2()
    server_stop()
    sys.exit()
    pass

@eel.expose
def centor_window():
    eel.start("set.html", size=(1024, 768), port=0,mode='edge')

@eel.expose
def centor_window2():
    eel.start("out.html", size=(1024, 768), port=0,mode='edge')

def main():
    eel.init("GUI3")
    eel.start("main.html", size=(1024, 768), port=0,close_callback=onCloseWindow,mode='edge')


if __name__ == '__main__':
    main()

#%%
