import sys
import socket
import selectors
import threading
import time
import eel
import re
import xml.etree.ElementTree as ET
from xml.dom import minidom
HOST = 'localhost'
PORT = 21000
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
    ship_time=float(time)

@eel.expose
def dice_turn_start():
    global sock_list
    printf("info:send dice_turn_start")
    pc_index=0
    for temp in sock_list.keys():
        append_senddata(temp,":5000:")
    pass

@eel.expose
def move_ship_turn_start():
    global sock_list
    printf("info:send move_ship_turn_start")
    pc_index=0
    for temp in sock_list.keys():
        append_senddata(temp,":5001:")
    pass

@eel.expose
def game_turn_start():
    global sock_list
    printf("info:send game_turn_start")
    pc_index=0
    for temp in sock_list.keys():
        append_senddata(temp,":5002:")
    pass

def calc_team_point(teamname,point):
    printf("info:calc_team_point_strat teamname="+str(teamname)+"  point="+str(point))
    try:
        eel.calc_team(teamname,point)
    except:
        pass
    try:
        tree = ET.parse('data/ranking.xml') 
    except:
        new_element=ET.Element('root')
        tree = ET.ElementTree(new_element)
        tree.write('data/ranking.xml')
        tree = ET.parse('data/ranking.xml') 
    root = tree.getroot()
    for team in root.findall('team'):
        name = team.find('name').text
        if(name==teamname):
            team.find('point').text=str(point)
            tree.write('data/ranking.xml')
            printf("susecce:cahge point teamname="+str(teamname)+"  point="+str(point))
            return
            pass
        pass
    team_element=ET.SubElement(root,"team")
    ET.SubElement(team_element,"name")
    ET.SubElement(team_element,"point")
    team_element.find('name').text=teamname
    team_element.find('point').text=str(point)
    tree.write('data/ranking.xml')
    printf("susecce:new team teamname="+str(teamname)+"  point="+str(point))

@eel.expose
def solve_problem(str2,data1):
    global pc_list
    global pc_index
    root_p=r'::FF(.*?)FF::'
    p = r':(.*?):'
    printf(str2)
    str2= re.findall(root_p, str2)
    printf(str2)
    for str3 in str2:
        printf(str3)
        data= re.findall(p, str3)
        try:
            if(int(data[0])==1):
                calc_team_point(data[1],data[2])
                continue
        except:
            printf("info:Unknown string entered1")
        printf("info:Unknown string entered2")
        pass

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
    server_stop()
    sys.exit()
    pass

@eel.expose
def centor_window():
    eel.start("ranking.html", size=(1024, 768), port=0,mode='edge')

def main():
    eel.init("GUI4")
    eel.start("main.html", size=(1024, 768), port=0,close_callback=onCloseWindow,mode='edge')


if __name__ == '__main__':
    main()
