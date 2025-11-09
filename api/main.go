package main

import (
	"api/ent"
	"api/session"
	"api/settings"
	"api/upload"
	"api/users"
	"api/web"
	"context"
	"fmt"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/core/router"
	"github.com/kataras/iris/v12/sessions"
	"github.com/kataras/iris/v12/sessions/sessiondb/boltdb"
	"log"
	"os"
)

func recoveryMiddleware(ctx iris.Context) {
	defer func() {
		if err := recover(); err != nil {
			log.Printf(session.Orange+"Recovered from panic | %v"+session.Reset, err)
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

	// dbConn, err := ent.Open("mysql", "admin:@wlc@P=crh:]tOM}@W8DU<H!@tcp(jaffix.eu:3306)/rohovykop?parseTime=true")
	dbConn, err := ent.Open("mysql", "mysql_graybox:bkLVC4vxx123@tcp(mysql.pearhost.cz:3306)/graybox_webstats?parseTime=true")
	err = dbConn.Debug().Schema.Create(context.Background())
	if err != nil {
		log.Fatalf("Failed to open connection to database: %v", err)
	}
	defer func(dbConn *ent.Client) {
		err := dbConn.Close()
		if err != nil {
			panic(err)
		}
	}(dbConn)

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
		Cookie:                      "monitorsession",
		DisableSubdomainPersistence: true,
	})
	ses.UseDatabase(db)

	s.Use(ses.Handler())
	s.Use(recoveryMiddleware)

	s.ConfigureContainer(func(container *router.APIContainer) {
		container.RegisterDependency(func() *ent.Client {
			return dbConn
		})

		container.PartyFunc("/api", func(api *router.APIContainer) {
			api.Post("/session/login", session.Login)
			api.Post("/session/logout", session.Logout)
			api.Get("/session/get", session.Session)
			api.Get("/profile/get", session.GetUserInfo)
			api.Post("/clanek/create", upload.NovyClanek)
			api.Post("/clanek/delete", upload.DeleteClanek)
			api.Post("/clanek/edit", upload.UpravitClanek)
			api.Post("/clanek/verejne", upload.VisibleClanek)
			api.Get("/clanek/get/all", upload.GetClankyAll)
			api.Get("/clanek/get/obrazek", upload.GetClanekObrazek)
			api.Get("/uzivatele/get", users.GetUzivatele)
			api.Post("/uzivatele/edit", users.UpravitUzivatel)
			api.Post("/uzivatele/create", users.CreateUzivatel)
			api.Post("/uzivatele/delete", users.DeleteUzivatel)
			api.Post("/uzivatele/upgrade", users.UpgradeUzivatel)
			api.Post("/uzivatele/downgrade", users.DowngradeUzivatel)
			api.Post("/settings/edit", settings.Edit)
			api.Get("/settings/get", settings.Send)
			api.Get("/favicon/get", web.GetFavicon)
			api.Get("/logo/get", web.GetLogo)
			api.Get("/baner/get", web.GetBaner)
			api.Get("/clanek/get", web.GetClanky)
			container.PartyFunc("/api/web", func(webnode *router.APIContainer) {
				webnode.Get("/onas", web.Onas)
			})
		})
	})

	err = s.Listen(":8089")
	if err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}

}
