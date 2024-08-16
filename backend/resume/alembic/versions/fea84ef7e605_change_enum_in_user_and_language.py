"""change enum in user and language

Revision ID: fea84ef7e605
Revises: 22df9de6b5eb
Create Date: 2024-08-16 12:24:46.479825

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'fea84ef7e605'
down_revision: Union[str, None] = '22df9de6b5eb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(
        "ALTER TABLE languages ALTER COLUMN proficiency TYPE languageproficiency USING proficiency::text::languageproficiency"
    )
    op.execute(
        'ALTER TABLE "user" ALTER COLUMN role TYPE userrole USING role::text::userrole'
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'role',
               existing_type=sa.Enum('user', 'admin', 'recruiter', name='userrole'),
               type_=sa.VARCHAR(),
               existing_nullable=False)
    op.alter_column('languages', 'proficiency',
               existing_type=sa.Enum('beginner', 'intermediate', 'advanced', 'native', name='languageproficiency'),
               type_=postgresql.ENUM('intermediate', name='beginner'),
               existing_nullable=True)
    # ### end Alembic commands ###
