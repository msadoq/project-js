all: gpcchs.bin timeBar.bin

clean: 
	rm -f gpcchs.bin gpcchs.o
	rm -f timeBar.bin timeBar.o

gpcchs.o: gpcchs.cpp
	g++ -Wall -o gpcchs.o -c gpcchs.cpp -I/usr/share/isis/include

timeBar.o: timeBar.cpp
	g++ -Wall -o timeBar.o -c timeBar.cpp -I/usr/share/isis/include

gpcchs.bin: gpcchs.o
	g++ -o gpcchs.bin gpcchs.o /usr/share/isis/lib/libzmq.a -lpthread

timeBar.bin: timeBar.o
	g++ -o timeBar.bin timeBar.o /usr/share/isis/lib/libzmq.a -lpthread

