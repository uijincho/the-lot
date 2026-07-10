from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    openai_api_key: str
    anthropic_api_key: str
    secret_key: str = "dev-secret-change-in-production"
    access_token_expire_minutes: int = 60 * 24 * 7  # 7 days

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
