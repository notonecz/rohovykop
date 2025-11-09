package session

import (
	"api/ent"
	"api/ent/user"
	_ "github.com/go-sql-driver/mysql"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/sessions"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/net/context"
	"log"
)

const DataID = "dataID"

var Reset = "\033[0m"
var Red = "\033[31m"
var Green = "\033[32m"
var Orange = "\033[38;5;214m"

type LoginParams struct {
	Pwd  string `json:"password"`
	Mail string `json:"username"`
}
type Data struct {
	User string `json:"user"`
}

func Login(ctx iris.Context, ses *sessions.Session, params LoginParams, db *ent.Client) Data {

	if db == nil {
		log.Fatalf("Database is not initialized")
	}

	u, err := db.User.Query().Where(user.Username(params.Mail), user.Deleted(false)).Only(context.Background())
	if err != nil {

		if ent.IsNotFound(err) {
			log.Println(Red + params.Mail + " | Se zkusil přihlásit (uživatel nenalezen)" + Reset)
			ses.Destroy()
			return Data{}
		}

		log.Println(Red + params.Mail + " | Errory při odesílání query: " + err.Error() + Reset)
		ses.Destroy()
		return Data{}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(params.Pwd)); err != nil {
		log.Println(Red + params.Mail + " | Se zkusil přihlásit (špatné heslo)" + Reset)
		ses.Destroy()
		return Data{}
	}

	log.Println(Green + params.Mail + " | Přihlášen" + Reset)
	res := Data{
		User: params.Mail,
	}

	ses.Set(DataID, u.ID)
	return res

}

func Logout(ctx iris.Context, ses *sessions.Session) {

	ses.Destroy()

}

func Session(ctx iris.Context, ses *sessions.Session, db *ent.Client) *Data {
	id, err := ses.GetInt(DataID)
	if err != nil {
		ctx.Application().Logger().Debugf("Raw session data invalid: %v", ses.Get(DataID))
		ses.Destroy()
		return nil
	}

	if id == 0 {
		ctx.Application().Logger().Debug("User ID is not set in session")
		ses.Destroy()
		return nil
	}

	u := db.User.GetX(ctx, id)

	return &Data{
		User: u.Email,
	}

}

func GetUserInfo(ctx iris.Context, db *ent.Client, ses *sessions.Session) *ent.User {
	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	return db.User.Query().
		Where(user.ID(id)).
		Select(user.FieldUsername, user.FieldEmail, user.FieldNameFirst, user.FieldNameLast, user.FieldRootAdmin).
		OnlyX(ctx)
}
