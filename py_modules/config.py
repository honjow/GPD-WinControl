import logging


try:
    LOG_LOCATION = f"/tmp/GPD-WinControl.log"
    logging.basicConfig(
        level=logging.INFO,
        filename=LOG_LOCATION,
        format="[%(asctime)s | %(filename)s:%(lineno)s:%(funcName)s] %(levelname)s: %(message)s",
        filemode="w",
        force=True,
    )
except Exception as e:
    logging.error(f"exception|{e}")


DEFAULT_MAPPINGS = """
lu=W
ld=S
ll=A
lr=D

du=MOUSE_WHEELUP
dd=MOUSE_WHEELDOWN
dl=HOME
dr=END

a=DOWN
b=RIGHT
x=LEFT
y=UP

l1=MOUSE_LEFT
r1=MOUSE_RIGHT
l2=MOUSE_MIDDLE
r2=MOUSE_FAST
l3=SPACE
r3=ENTER
start=NONE
select=NONE
menu=NONE

l41=SYSRQ
l42=NONE
l43=NONE
l44=NONE
r41=PAUSE
r42=NONE
r43=NONE
r44=NONE

l4delay1=0
l4delay2=0
l4delay3=0
l4delay4=300
r4delay1=0
r4delay2=0
r4delay3=0
r4delay4=300
"""
