package ip

import (
	"log"
	"net"
)

type Ip struct {
	Ip string `json:"ip"`
}

func Get() Ip {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer func(conn net.Conn) {
		err := conn.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(conn)

	localAddress := conn.LocalAddr().(*net.UDPAddr)

	return Ip{Ip: localAddress.IP.String()}
}
