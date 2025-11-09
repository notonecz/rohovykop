package web

import (
	"api/ent"
	"api/ent/clanky"
	"github.com/kataras/iris/v12"
)

type Clanek struct {
	Type int `json:"type"`
}

func GetClanky(ctx iris.Context, db *ent.Client, params Clanek) []*ent.Clanky {

	return db.Clanky.Query().
		Where(clanky.Typ(params.Type), clanky.Verejne(true)).
		Limit(10).
		AllX(ctx)

}
