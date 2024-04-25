import threading
import eel
import re
import sys
import socket
import time
import xml.etree.ElementTree as ET
import random

client_start=False
client_index=-1
SERVER = "localhost"
PORT = 20001
client_statu=False
send_data_bool=False
send_data=""

def printf(str1):
    eel.logprint(str1)
    print(str1)

@eel.expose
def change_current_value(teamname,distance,point,buf):
    global send_data_bool
    global send_data
    global dise_statu
    try:
        append_send_data(":305::"+str(teamname)+"::"+str(distance)+"::"+str(point)+"::"+str(buf)+":")
        pass
    except:
        printf("error :can't add send_data(change_current_value)")
        pass
    send_data_bool=True
    dise_statu=True
    pass

def calc_team_finish_game(teamname,distance,point,buf):
    eel.team_finish(teamname, distance, point, buf)
    pass

def solve_problem(str2):
    global dise_list
    global client_index
    root_p=r'::FF(.*?)FF::'
    p = r':(.*?):'
    str2= re.findall(root_p, str2)
    for str3 in str2:
        data= re.findall(p, str3)
        try:
            if (int(data[0])==1):
                stop()
                printf("info :the server has asked to be terminated.")
                continue
            if (int(data[0])==101):
                eel.index_set_ready()
                printf("info :Ready to set up client index")
                continue
            if (int(data[0])==102):
                client_index=data[1]
                eel.set_index(client_index)
                printf("info : client index = "+str(client_index))
                continue
            if(int(data[0])==300):
                dise_list.append([data[1],data[2],data[3],data[4]])
                printf("info :please add distance teamname="+str(data[1])+" distance="+str(data[2])+"point="+str(data[3])+"buf="+str(data[4]))
                continue
            if(int(data[0])==310):
                printf("info :already added teamname="+str(data[1]))
                eel.team_inputbox_visible()
                continue
            if(int(data[0])==400):
                thread10=threading.Thread(target=game_window,daemon=True)
                thread10.start()
                printf("info :game start")
                continue
            if(int(data[0])==401):
                printf("info :game finish")
                continue
            if(int(data[0])==450):
                calc_team_finish_game(data[1],data[2],data[3],data[4])
                printf("info :teamname "+str(data[1])+" finish")
                continue
            if(int(data[0])==500):
                printf("info :move ship direction="+str(data[1])+" route="+str(data[2]))
                eel.start_ship(str(data[1]),int(data[2]))
                if(str(client_index)=="0"):
                    time.sleep(2)
                    eel.team_inputbox_visible()
                continue
            if(int(data[0])==1000):
                printf("info :dice_start team="+str(data[1])+" dis="+str(data[2]))
                eel.client_roll_dice1(str(data[1]),int(data[3]))
                continue
            if(int(data[0])==1100):
                printf("info :game_start team="+str(data[1])+" dis="+str(data[2]))
                eel.client_start_game1(str(data[1]),int(data[3]))
                continue
        except:
            printf("info:Unknown string entered")
            continue
        printf("info:Unknown string entered")
        continue

@eel.expose
def getindex():
    global client_index
    return int(client_index)

@eel.expose
def server_sound(path):
    append_send_data(":900::"+str(path)+":")


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
            solve_problem(data)
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
    global send_data
    global client_statu
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(10)
        try:
            sock.connect((SERVER, PORT))
            printf('success : connected to server'+str(SERVER)+"port"+str(PORT))
        except:
            stop()
            printf('error : server='+str(SERVER)+" port="+str(PORT)+" is not connected")
            autostart()
            return
        thread1=threading.Thread(target=client_rcvdata,daemon=True,args=(sock,))
        thread1.start()
        while True:
            if send_data_bool:
                send_data_bool=False
                # temp=send_data.encode()
                # sock.sendall(temp)
                try:
                    temp=send_data.encode('utf-8')
                    sock.sendall(temp)
                    printf("success : sending data to server="+str(send_data))
                except:
                    printf("error : can't sending data to server="+str(send_data))
            if client_statu:
                sock.shutdown(socket.SHUT_WR)
                printf("info : client is shutting down")
                return


def onCloseWindow(page, sockets):
    stop()
    time.sleep(3)
    sys.exit()
    pass

@eel.expose
def stop():
    print("stopping")
    global client_statu
    global client_start
    client_statu=True
    client_start=False

@eel.expose
def select_HOST(stt):
    printf(stt+"=ip")
    global SERVER
    SERVER = str(stt)

@eel.expose
def append_send_data(data):
    print("sending")
    global send_data_bool
    send_data_bool=True
    global send_data
    send_data="::FF"+data+"FF::"


dise_statu=False
dise_list=[]
dise_num=0

def move_ship(direction, route):
    eel.start_ship(direction, route)
    pass

@eel.expose
def add_team(teamname):
    append_send_data(":200::"+str(teamname)+":")
    pass

def dise_run():
    printf("dise_run start")
    global client_statu
    global dise_list
    global dise_statu
    global dise_num
    while True:
        if client_statu:
            break
        time.sleep(0.1)
        if 0<len(dise_list):
            try:
                temp_data=dise_list.pop(0)
                printf("start_game teamname ="+ str(temp_data[0]))
                eel.roll_dice_and_score(temp_data[0],temp_data[1],temp_data[2],temp_data[3])
                while not(dise_statu):
                    time.sleep(0.1)
                    pass
                printf("finish_game teamname ="+ str(temp_data[0]))
                time.sleep(10)
                dise_statu=False
                pass
            except:
                printf("error : dise_run error")
    printf("info : dise_run shutdown")
    pass


@eel.expose
def dise_data(num):
    global dise_num
    global dise_statu
    dise_num=int(num)
    dise_statu=True
    pass


@eel.expose
def start():
    global client_statu
    global client_start
    if client_start:
        printf("info : client already started")
        return
    client_statu=False
    thread1 = threading.Thread(target=client,daemon=True)
    thread1.start()
    thread2 = threading.Thread(target=dise_run,daemon=True)
    thread2.start()
    pass

def autostart():
    global SERVER
    global PORT
    tree = ET.parse('data/setting.xml')
    root = tree.getroot()
    SERVER=root.find('s_ip').text
    PORT=int(root.find('s_port').text)
    time.sleep(5)
    printf("autorun started")
    time.sleep(random.random()*10)
    start()
    pass


@eel.expose
def game_window():
    eel.start("index.html", size=(1024, 768), port=0,mode='edge')

def main():
    thread3 = threading.Thread(target=autostart,daemon=True)
    thread3.start()
    eel.init("GUI")
    eel.start("main.html", size=(1024, 768), port=0,close_callback=onCloseWindow,mode='edge')

@eel.expose
def load_function():
    global client_index
    eel.set_index(client_index)
    if(str(client_index)=="0"):
        eel.team_inputbox_visible()

if __name__ == '__main__':
    main()
# %%