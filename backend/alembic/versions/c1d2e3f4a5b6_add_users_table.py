"""add users table

Revision ID: c1d2e3f4a5b6
Revises: b3e9f1a2c4d5
Create Date: 2026-07-10 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, JSONB

revision: str = 'c1d2e3f4a5b6'
down_revision: Union[str, None] = 'b3e9f1a2c4d5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', UUID(as_uuid=True), primary_key=True),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('hashed_password', sa.Text, nullable=False),
        sa.Column('name', sa.String(255), nullable=True),
        sa.Column('instruments', sa.ARRAY(sa.String), nullable=True),
        sa.Column('age', sa.Integer, nullable=True),
        sa.Column('experience', sa.String(20), nullable=True),
        sa.Column('corps_history', JSONB, nullable=True),
        sa.Column('states', sa.ARRAY(sa.String), nullable=True),
        sa.Column('created_at', sa.DateTime, nullable=False, server_default=sa.func.now()),
    )
    op.create_index('ix_users_email', 'users', ['email'], unique=True)


def downgrade() -> None:
    op.drop_index('ix_users_email', table_name='users')
    op.drop_table('users')
