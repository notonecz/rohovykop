package users

import (
	"api/ent"
	"api/ent/user"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/sessions"
	"golang.org/x/crypto/bcrypt"
)

const DataID = "dataID"

type User struct {
	ID        int    `json:"id,omitempty"`
	Username  string `json:"username,omitempty"`
	Email     string `json:"email,omitempty"`
	NameFirst string `json:"name_first,omitempty"`
	NameLast  string `json:"name_last,omitempty"`
	Password  string `json:"password,omitempty"`
	Deleted   bool   `json:"deleted,omitempty"`
	RootAdmin int    `json:"root_admin,omitempty"`
}

func GetUzivatele(ctx iris.Context, ses *sessions.Session, db *ent.Client) []*ent.User {

	_, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	return db.User.Query().
		Where(user.Deleted(false)).
		AllX(ctx)

}

func UpravitUzivatel(ctx iris.Context, ses *sessions.Session, db *ent.Client, params User) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	userEdit := db.User.Query().
		Where(
			user.ID(params.ID),
		).
		OnlyX(ctx)

	if (executor.RootAdmin == 2 && userEdit.RootAdmin <= 1) || (executor.RootAdmin == 1 && userEdit.RootAdmin <= 0) || executor.ID == userEdit.ID {

		if params.Password == "" {
			db.User.Update().
				Where(user.ID(params.ID)).
				SetNameFirst(params.NameFirst).
				SetNameLast(params.NameLast).
				SetUsername(params.Username).
				SetEmail(params.Email).
				SaveX(ctx)
		} else {

			hashedPassword, err := bcrypt.GenerateFromPassword([]byte(params.Password), bcrypt.DefaultCost)
			if err != nil {
				panic(err)
			}

			db.User.Update().
				Where(user.ID(params.ID)).
				SetNameFirst(params.NameFirst).
				SetNameLast(params.NameLast).
				SetEmail(params.Email).
				SetUsername(params.Username).
				SetPassword(string(hashedPassword)).
				SaveX(ctx)
		}

	} else {
		panic("no permission! | " + executor.Email)
	}

}

func CreateUzivatel(ctx iris.Context, ses *sessions.Session, db *ent.Client, params User) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	if executor.RootAdmin == 2 || executor.RootAdmin == 1 {

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(params.Password), bcrypt.DefaultCost)
		if err != nil {
			panic(err)
		}

		db.User.Create().
			SetNameFirst(params.NameFirst).
			SetNameLast(params.NameLast).
			SetEmail(params.Email).
			SetUsername(params.Username).
			SetRootAdmin(0).
			SetPassword(string(hashedPassword)).
			SaveX(ctx)

	} else {
		panic("no permission! | " + executor.Email)
	}

}

func DeleteUzivatel(ctx iris.Context, ses *sessions.Session, db *ent.Client, params User) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	userEdit := db.User.Query().
		Where(
			user.ID(params.ID),
		).
		OnlyX(ctx)

	if (executor.RootAdmin == 2 && userEdit.RootAdmin <= 1) || (executor.RootAdmin == 1 && userEdit.RootAdmin <= 0) {

		db.User.Update().
			Where(user.ID(params.ID)).
			SetDeleted(true).
			SaveX(ctx)

	} else {
		panic("no permission! | " + executor.Email)
	}

}

func UpgradeUzivatel(ctx iris.Context, ses *sessions.Session, db *ent.Client, params User) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	userEdit := db.User.Query().
		Where(
			user.ID(params.ID),
		).
		OnlyX(ctx)

	if (executor.RootAdmin == 2 && userEdit.RootAdmin <= 1) || (executor.RootAdmin == 1 && userEdit.RootAdmin <= 0) {

		db.User.Update().
			Where(user.ID(params.ID)).
			SetRootAdmin(userEdit.RootAdmin + 1).
			SaveX(ctx)

	} else {
		panic("no permission! | " + executor.Email)
	}

}

func DowngradeUzivatel(ctx iris.Context, ses *sessions.Session, db *ent.Client, params User) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	userEdit := db.User.Query().
		Where(
			user.ID(params.ID),
		).
		OnlyX(ctx)

	if (executor.RootAdmin == 2 && userEdit.RootAdmin <= 1) || (executor.RootAdmin == 1 && userEdit.RootAdmin <= 0) {

		if !(userEdit.RootAdmin == 0) {
			db.User.Update().
				Where(user.ID(params.ID)).
				SetRootAdmin(userEdit.RootAdmin - 1).
				SaveX(ctx)
		} else {
			panic("min value! | " + executor.Email)
		}

	} else {
		panic("no permission! | " + executor.Email)
	}

}
