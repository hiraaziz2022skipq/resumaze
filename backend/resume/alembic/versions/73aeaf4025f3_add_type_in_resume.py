"""add type in resume

Revision ID: 73aeaf4025f3
Revises: dec1f070a883
Create Date: 2024-08-25 01:25:08.856044

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '73aeaf4025f3'
down_revision: Union[str, None] = 'dec1f070a883'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('extrainfo', sa.Column('extra', postgresql.JSON(astext_type=sa.Text()), nullable=False))
    op.drop_column('extrainfo', 'value')
    op.drop_column('extrainfo', 'key')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('extrainfo', sa.Column('key', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('extrainfo', sa.Column('value', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_column('extrainfo', 'extra')
    # ### end Alembic commands ###
