# Expose existing agents through email

Use one dedicated team mailbox with an alias for each agent. Route each alias to
an existing agent definition instead of creating an email-only copy of the role.
Keep every message filed, including mail that does not match an agent.

**This is a runtime-neutral integration pattern, not a working email adapter.**
The scaffold supplies no mailbox provisioning, mail transport, OAuth setup or
email execution command. Choose those separately; copying this guide does not
connect an inbox or authorize an agent to send mail.

## One mailbox, several agent addresses

The following addresses are synthetic placeholders, not configuration:

| Address | Purpose | Filing |
| --- | --- | --- |
| `team@example.com` | Dedicated mailbox and unmatched mail | `Team / Other` |
| `helper@example.com` | Route to the existing helper | `Agents / Helper` |
| `researcher@example.com` | Route to an operator-defined researcher | `Agents / Researcher` |

An alias is an address, not another agent definition, mailbox or permission
boundary. This pattern assumes the roles may share mailbox access. Use separate
mailboxes or enforced access boundaries when they must not see one another's
mail. Confirm the provider's mailbox, alias and sender-identity requirements;
do not assume a group, forwarding address and sign-in mailbox are interchangeable.

## Keep each address with its agent

An agent that has an email address declares it in its own definition. In the
runtime-neutral scaffold, use an optional `Email` line in
`agents/<name>/agent.md`, as the [helper](../agents/helper/agent.md) demonstrates:

```markdown
# Release-note helper

Email: `helper@example.com` (synthetic example; no mailbox is connected).
```

Replace the synthetic address in your company copy when assigning a real one.
Omit the line for agents without email; do not infer an address from a folder
name or give every agent an inbox automatically. This is descriptive metadata,
not an instruction to send mail or evidence that an alias is provisioned.

Keep one authoritative address with the role. If the selected runtime supports
typed email metadata, put it in that agent's machine-readable definition and
derive routing from it rather than maintaining a second central address list.
This guide does not add an `email` field to Dispatch's executable schema or
make an arbitrary frontmatter key operational. An adapter still needs explicit
support to read, validate and use the declaration.

Installation configuration selects which agents are exposed and supplies the
shared mailbox, provider connection, credentials and authorization policy.
Check declared addresses against the connected mailbox's verified aliases and
sender identities before enabling them; reject conflicting address ownership.
An address change is a deliberate routing migration, not permission to reassign
old conversation history to another role.

Keep the public template generic. Real role addresses belong in the company's
appropriately private definitions; private mailbox settings and allowed
correspondents belong in installation configuration. Keep credentials in its
supported secret store, not instructions, example files or Git. Grant access to
the dedicated mailbox only, not unrelated personal mail.

## Keep role, channel and state separate

```text
recipient alias
  -> mail adapter: validate sender, select role, resolve thread
  -> existing agent definition + durable conversation
  -> mail adapter: send the permitted reply as that alias
```

The role owns its purpose, instructions, skills, optional email address and
permitted work. The installation enables channels for that role; the adapter
owns mail delivery, filing and thread mapping. Shared transport mechanics belong in the chosen
runtime or integration package, not copied into every agent. The company owns
its routing and authorization policy.

Use the runtime's durable conversation store as the authority for execution.
Email is an asynchronous exchange of messages, not a live transcript mirror.
An agent may also be available in chat or a terminal without exposing those
conversations, private tool results or internal handoffs to email recipients.
Send a deliberate email response, not a dump of the agent's history.

Start a new conversation for a new authorized email thread. Bind subsequent
messages to that conversation using the mailbox, routed agent and provider
thread identity; preserve native reply headers and provider identifiers when
sending. Do not identify conversations by subject alone or join two channels
merely because their display names match. Recheck sender and recipient
authorization on every message, including participant changes. A forwarded
transcript does not authorize access to its original conversation.

## File all mail without using filing as execution state

Create a label or folder for each agent and a catch-all for everything else.
Apply the matching label and remove ordinary incoming mail from the general
Inbox after successful filing. Keep unmatched mail visible in `Team / Other`
for human review; never send it to an arbitrary default agent.

Use the provider's actual delivered-recipient evidence where available. Test
direct delivery, copies, forwarding and hidden recipients rather than assuming
the visible `To` field identifies the alias. If no single authorized route can
be established, file for review without executing. Mail addressed to multiple
agents needs an explicit routing decision; do not silently trigger every role.

Cover sent replies as well as incoming messages. Retain provider spam, trash
and quarantine protections: those messages are not work requests. Filing must
not delete evidence, mark work complete or make an unprocessed message invisible
to the adapter. In particular, an adapter must not depend solely on `INBOX` or
unread status when filters archive incoming mail.

Keep processing receipts separately from presentation labels. Record stable
provider message IDs, conversation bindings and outbound delivery status in
durable state. A duplicate notification or reread must not create a second
assignment. Recover admitted work through the runtime rather than submitting
the same email again.

## Authorization and replies

- Receiving mail is not blanket permission to use every tool. Define allowed
  senders, permitted actions and escalation rules before enabling execution.
  Display names and a visible sender address alone are not authentication.
- Treat quoted mail, attachments and retrieved content as untrusted task data,
  not instructions that can change access rules or disclose credentials.
- Configure and verify sending as each alias separately from receiving it.
  Use the selected alias consistently for the reply identity; do not fall back
  silently to a personal account or expose a different agent's address.
- Choose the permitted recipient set deliberately. Validate `Reply-To`, new
  participants and reply-all behavior against the thread's disclosure policy
  before sending. A new recipient must not inherit access to prior private work.
- Suppress self-generated mail, automatic responses, bounces and mailing-list
  loops from agent execution. Do not send acknowledgments to arbitrary senders.
- Distinguish generated, submitted, accepted by the provider and delivered.
  After an uncertain send, inspect provider receipts or sent mail using a stable
  outbound identity before retrying. If the outcome cannot be established, leave
  it unresolved for review rather than claiming success or blindly sending twice.

## Adopt and verify

1. Choose a dedicated mailbox and the existing roles to expose. Declare each
   assigned address in its owning agent definition. Decide who may write to them,
   what work email can authorize and who handles unmatched mail.
2. Configure aliases, filing and sender identities with the mail provider.
   Authorize narrowly scoped mailbox access through the installation's supported
   credential flow. Mailbox setup alone is not an operational agent.
3. Select or implement the adapter and private connection settings. Validate
   enabled agents' declared addresses against provider configuration. Document
   startup, durable state, delivery receipts and recovery beside the integration.
   If using Dispatch, keep reusable transport in Dispatch and company definitions
   in the company repository; this guide does not prescribe an unshipped API.
4. Run controlled end-to-end checks using authorized test correspondents.
   Record the actual adapter/definition revisions and observed results privately.

Before enabling ordinary mail, verify:

| Check | Required observation |
| --- | --- |
| Address declaration | Address belongs to its agent definition; absent email stays disabled and conflicting ownership is rejected |
| First message to each alias | Correct filing and role; exactly one admitted assignment and a reply from the selected alias |
| Follow-up after restart | Same durable conversation, retained context and no replayed assignment or reply |
| New thread with the same subject | Separate conversation and no unrelated history disclosure |
| Unmatched or ambiguous recipients | Filed for review without invoking the wrong role |
| Forwarded, copied and hidden recipients | Verified routing or explicit review, not guessed identity |
| Unauthorized sender or changed recipients | No unauthorized execution or disclosure |
| Quoted instruction or attachment attack | Data cannot override role permissions or outbound policy |
| Duplicate delivery or interrupted processing | Existing receipt and admitted work reused |
| Automatic response, self-mail or bounce | No reply loop |
| Provider timeout during send | Receipt reconciled or outcome left unresolved, not a blind resend |
| Archived inbound and sent mail | Both remain filed and discoverable without relying on the Inbox |

These are acceptance criteria, **not results obtained by this scaffold**.
Remove disposable test messages and state only after retaining the necessary
verification record, and preserve real mail and existing conversations.

See [authoring](authoring.md) for role ownership and
[operations](operations.md) for maintaining a company copy.
