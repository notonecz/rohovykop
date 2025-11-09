package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"regexp"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.Int("id").Positive().Immutable().Unique(),
		field.String("username").NotEmpty().Unique(),
		field.String("email").NotEmpty().Match(regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)).Unique(),
		field.String("name_first").Optional(),
		field.String("name_last").Optional(),
		field.String("password").NotEmpty().Sensitive(),
		field.Bool("deleted").Default(false),
		field.Int("root_admin"),
	}
}

// Edges of the Produkt.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("clanky", Clanky.Type).Annotations(entsql.Annotation{
			OnDelete: entsql.Cascade,
		}),
	}
}
