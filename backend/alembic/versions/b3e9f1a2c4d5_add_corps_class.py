"""add corps_class

Revision ID: b3e9f1a2c4d5
Revises: d684178ee7f1
Create Date: 2026-07-09 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'b3e9f1a2c4d5'
down_revision: Union[str, None] = 'd684178ee7f1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('corps', sa.Column('corps_class', sa.String(10), nullable=True, server_default='World'))


def downgrade() -> None:
    op.drop_column('corps', 'corps_class')
