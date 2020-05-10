from fastapi import FastAPI, Request, Response, HTTPException, BackgroundTasks
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse

import argparse

# This setup must be done before importing route handlers, since common.py depends on the Sessionmaker reference.
parser = argparse.ArgumentParser()
parser.add_argument('--db', dest = 'db', required = True)
parser.add_argument('--socket', dest = 'socket', required = True)
args = parser.parse_args()

import db
db.connect(args.db)

import comments, users, spem, util, emails, email_templates

app = FastAPI()

app.include_router(comments.router)
app.include_router(users.router)
app.include_router(spem.router)

@app.exception_handler(500)
async def http_err_handler(req: Request, exc: Exception): #, bg: BackgroundTasks):
	status_code = exc.status_code if hasattr(exc, 'status_code') else 500
	if status_code >= 500:
		emails.send(util.SERVER_EMAIL, ['rlwestlund@gmail.com'],
			'yujiri.xyz err', email_templates.ERROR_TXT(exc))
	return Response(status_code = status_code, content = getattr(exc, 'detail', ''))

@app.exception_handler(HTTPException)
async def other_err_handler(req: Request, exc: Exception):
	return Response(status_code = exc.status_code, content = exc.detail)

@app.exception_handler(RequestValidationError)
async def validation_err_handler(req: Request, exc: Exception):
	return Response(status_code = 400)

import uvicorn
uvicorn.run(app, uds = args.socket)
