package settings

import (
	"api/ent"
	"api/ent/setting"
	"api/ent/user"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/sessions"
)

const DataID = "dataID"

type Nastaveni struct {
	Logo  string `json:"logo"`
	Baner string `json:"baner"`
	Icon  string `json:"icon"`
	ONas  string `json:"onas"`
}

func Edit(ctx iris.Context, ses *sessions.Session, db *ent.Client, params *Nastaveni) {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	if executor.RootAdmin > 0 {
		values := []struct {
			ID    int
			Value string
		}{
			{1, params.Baner},
			{2, params.Logo},
			{3, params.Icon},
			{4, params.ONas},
		}

		for _, v := range values {
			db.Setting.Update().Where(setting.ID(v.ID)).SetValue(v.Value).ExecX(ctx)
		}
	}

}

func Send(ctx iris.Context, ses *sessions.Session, db *ent.Client) Nastaveni {

	id, err := ses.GetInt(DataID)
	if err != nil {
		panic(err)
	}

	executor := db.User.Query().
		Where(
			user.ID(id),
		).
		OnlyX(ctx)

	if executor.RootAdmin > 0 {

		result := Nastaveni{}

		values := []struct {
			ID     int
			Target *string
		}{
			{1, &result.Baner},
			{2, &result.Logo},
			{3, &result.Icon},
			{4, &result.ONas},
		}

		for _, v := range values {
			settingValue := db.Setting.Query().Where(setting.ID(v.ID)).OnlyX(ctx)
			*v.Target = settingValue.Value
		}

		return result

	} else {
		panic("nedostatecna prava")
	}
}
