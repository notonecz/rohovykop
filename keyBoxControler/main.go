package main

import (
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/core/router"
	"github.com/kataras/iris/v12/sessions"
	"github.com/kataras/iris/v12/sessions/sessiondb/boltdb"
	"keyBoxControler/ip"
	"log"
	"os"
)

func recoveryMiddleware(ctx iris.Context) {
	defer func() {
		if err := recover(); err != nil {
			log.Printf("Recovered from panic")
			ctx.StatusCode(iris.StatusInternalServerError)
			err := ctx.JSON(iris.Map{
				"status":  "error",
				"message": fmt.Sprint(err),
			})
			if err != nil {
				return
			}
		}
	}()
	ctx.Next()
}

func main() {

	s := iris.Default()
	db, err := boltdb.New("./sessions.db", os.FileMode(0750))
	if err != nil {
		panic(err)
	}
	defer func(db *boltdb.Database) {
		err := db.Close()
		if err != nil {
			panic(err)
		}
	}(db)

	ses := sessions.New(sessions.Config{
		Cookie: "monitorsession",
	})
	ses.UseDatabase(db)

	s.Use(ses.Handler())
	s.Use(recoveryMiddleware)

	s.ConfigureContainer(func(container *router.APIContainer) {
		container.PartyFunc("/ip", func(api *router.APIContainer) {
			api.Get("/get", ip.Get)
		})
	})

	err = s.Listen(":8089")
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}

}
