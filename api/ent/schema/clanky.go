package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Clanky holds the schema definition for the Clanky entity.
type Clanky struct {
	ent.Schema
}

// Fields of the Clanky.
func (Clanky) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Positive().Immutable().Unique(),
		field.String("nazev").NotEmpty(),
		field.Int("typ").Immutable(),
		field.Int("autor_id").Positive(),
		field.Time("date"),
		field.Bool("verejne"),
		field.Text("text"),
		field.Text("image").Optional(),
	}
}

// Edges of the Clanky.
func (Clanky) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("autor", User.Type).Required().Unique().Field("autor_id").Ref("clanky"),
	}
}
