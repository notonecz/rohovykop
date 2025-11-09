package web

import (
	"api/ent"
	"api/ent/setting"
	"github.com/kataras/iris/v12"
)

func Onas(ctx iris.Context, db *ent.Client) *ent.Setting {

	return db.Setting.Query().
		Where(setting.ID(4)).
		OnlyX(ctx)

}
