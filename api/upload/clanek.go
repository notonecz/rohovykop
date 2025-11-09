package upload

import (
	"api/ent"
	"api/ent/clanky"
	"api/ent/user"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/sessions"
	"time"
)

const DataID = "dataID"

type Clanek struct {
	ID      int    `json:"id"`
	Nazev   string `json:"nazev"`
	Text    string `json:"text"`
	Type    int    `json:"type"`
	Verejne bool   `json:"verejne"`
	Image   string `json:"image"`
}

func NovyClanek(ctx iris.Context, ses *sessions.Session, db *ent.Client, params Clanek) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	userID := db.User.Query().
		Where(user.ID(id)).
		Select(user.FieldID).
		OnlyX(ctx)

	db.Clanky.Create().
		SetAutor(userID).
		SetDate(time.Now()).
		SetNazev(params.Nazev).
		SetTyp(params.Type).
		SetText(params.Text).
		SetVerejne(params.Verejne).
		SetImage(params.Image).
		ExecX(ctx)

}
func DeleteClanek(ctx iris.Context, ses *sessions.Session, db *ent.Client, params Clanek) {

	_, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	db.Clanky.Delete().Where(clanky.ID(params.ID)).ExecX(ctx)

}
func UpravitClanek(ctx iris.Context, ses *sessions.Session, db *ent.Client, params Clanek) {

	_, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	db.Clanky.Update().
		Where(clanky.ID(params.ID), clanky.Verejne(false)).
		SetNazev(params.Nazev).
		SetText(params.Text).
		SetDate(time.Now()).
		SetImage(params.Image).
		ExecX(ctx)

}

func VisibleClanek(ctx iris.Context, ses *sessions.Session, db *ent.Client, params Clanek) {
	_, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	db.Clanky.Update().
		Where(clanky.ID(params.ID)).
		SetVerejne(params.Verejne).
		ExecX(ctx)

}

func GetClankyAll(ctx iris.Context, ses *sessions.Session, db *ent.Client, params Clanek) []*ent.Clanky {

	_, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	return db.Clanky.Query().
		Where(clanky.Typ(params.Type)).
		WithAutor(func(u *ent.UserQuery) {
			u.Select(user.FieldID, user.FieldNameFirst, user.FieldNameLast)
		}).
		AllX(ctx)

}

func GetClanekObrazek(ctx iris.Context, ses *sessions.Session, db *ent.Client, params Clanek) *ent.Clanky {

	_, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}
	return db.Clanky.Query().
		Where(clanky.ID(params.ID)).
		Select(clanky.FieldImage).
		OnlyX(ctx)

}
