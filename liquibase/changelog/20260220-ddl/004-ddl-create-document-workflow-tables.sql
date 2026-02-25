--liquibase Formatted SQL

--changeset lisandro.ortega:document_status.001.1 context:dev,qa,prod
--comment: Create document_status table

CREATE TABLE if not exists public.document_status (
	id serial4 NOT NULL,
	code varchar(20) NOT NULL, -- e.g. draft, pending, scheduled, in_progress, completed, cancelled, voided.
  "name" varchar(50) NOT NULL,
	is_editable bool DEFAULT false not NULL,
	is_final bool DEFAULT false not NULL,
	is_posted bool DEFAULT false not NULL,
	allow_backwards bool DEFAULT false NOT null,
	readonly bool DEFAULT false not null,
	item_order int4 DEFAULT 0 not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--drop table if exists public.document_status;

--changeset lisandro.ortega:document_action.001.1 context:dev,qa,prod
--comment: Create document_action table: confirm(draft->pending), schedule(pending->scheduled), start(scheduled->in_progress), complete(in_progress->completed), cancel(any->cancelled), void(completed->voided).

CREATE TABLE if not exists public.document_action (
  id serial4 NOT NULL,
  code varchar(50) NOT NULL, -- e.g. confirm, schedule, re-schedule, start, complete, cancel, void, close.
  "name" varchar(100) NOT NULL,
	readonly bool DEFAULT false not null,
	item_order int4 DEFAULT 0 not null,
  PRIMARY KEY (id),
  UNIQUE (code)
);

--drop table if exists public.document_action;

--changeset lisandro.ortega:document_type.001.1 context:dev,qa,prod
--comment: Create document_type table: e.g. ServiceOrder (internal), SalesOrder (out), PurchaseOrder(in), Invoice(out), ReceiptNote(in), etc. 

CREATE TABLE if not exists public.document_type (
	id serial4 NOT NULL,
	code varchar(20) NOT NULL, -- e.g. service_order, sales_order, purchase_order, sales_invoice, purchase_invoice, receipt_note, delivery_note, etc.
  "name" varchar(250) NOT NULL,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
  UNIQUE (code)
);

--drop table if exists public.document_type;

--changeset lisandro.ortega:document_engine.001.1 context:dev,qa,prod
--comment: Create document_engine table

CREATE TABLE if not exists public.document_engine (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	code varchar(100) NOT NULL,
  "name" varchar(250) NOT NULL,
  description text null,
	document_type_id int4 NOT NULL,
  initial_state_id int4 not NULL,
  is_default bool DEFAULT false not NULL, -- only one default per document type
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
  FOREIGN KEY (document_type_id) REFERENCES public.document_type(id) ON DELETE CASCADE,
	FOREIGN KEY (initial_state_id) REFERENCES public.document_status(id) ON DELETE cascade
);

--drop table if exists public.document_engine;

--changeset lisandro.ortega:document_engine_item.001.1 context:dev,qa,prod
--comment: Create document_engine_item table: defining allowed state transitions and actions for a document engine

CREATE TABLE if not exists public.document_engine_item (
	id uuid DEFAULT uuid_generate_v4() NOT NULL,
	document_engine_id uuid NOT NULL,
	document_action_id int4 NOT NULL,
	from_state_id int4 NOT NULL,
	to_state_id int4 NOT NULL,
	readonly bool DEFAULT false not null,
	PRIMARY KEY (id),
	FOREIGN KEY (document_engine_id) REFERENCES public.document_engine(id) ON DELETE CASCADE,
	FOREIGN KEY (document_action_id) REFERENCES public.document_action(id) ON DELETE CASCADE,
	FOREIGN KEY (from_state_id) REFERENCES public.document_status(id) ON DELETE CASCADE,
	FOREIGN KEY (to_state_id) REFERENCES public.document_status(id) ON DELETE CASCADE,
  UNIQUE (document_engine_id, from_state_id, to_state_id),
  UNIQUE (document_engine_id, document_action_id)
);

--drop table if exists public.document_engine_item;
